import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/market/columns";
import { 
  ShoppingCart, 
  AlertCircle,
  InfoIcon,
  Clock,
  CheckCircle2,
  Ban
} from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMyMarketDuties } from "@/services/market-schedule.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Duties | MessManager",
  description: "Track your assigned bazaar days and view shopping lists.",
};

export default async function MemberMarketDutiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Market Duties"
          description="Track bazaar days."
        />
        <Alert className="mt-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>No Active Mess</AlertTitle>
          <AlertDescription>Please join a mess to see your market duties.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const status = (typeof params.status === "string" ? params.status : params.status?.[0]) || "all";
  
  const { data, meta } = await getMyMarketDuties(activeMessId, params);

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Market Duties"
        description="Track your assigned bazaar days, view shopping lists, and record actual expenditures."
      />

      <Tabs value={status}>
        <TabsList variant="line">
          <Link href="/dashboard/market-duties">
            <TabsTrigger value="all">
              <ShoppingCart className="h-4 w-4" />
              <span>All Duties</span>
            </TabsTrigger>
          </Link>
          <Link href="?status=pending">
            <TabsTrigger value="pending">
              <Clock className="h-3.5 w-3.5" />
              Pending
            </TabsTrigger>
          </Link>
          <Link href="?status=completed">
            <TabsTrigger value="completed">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Completed
            </TabsTrigger>
          </Link>
          <Link href="?status=void">
            <TabsTrigger value="void">
              <Ban className="h-3.5 w-3.5" />
              Voided
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      <DataTable columns={columns} data={data || []} meta={meta} />

      {/* Quick Tips */}
      <div className="mt-6 p-4 rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-amber-700">Reporting Tip</p>
          <p className="text-xs text-amber-600 leading-relaxed">
            Please make sure to collect all receipts during bazaar. You need to record the final amount spent to update the mess balance accurately.
          </p>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/market/columns";
import {
  getMarketSchedules,
  getMyMarketDuties,
} from "@/services/market-schedule.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { AlertCircle } from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MarketScheduleFilters } from "@/components/market/market-schedule-filters";
import { CreateMarketScheduleModal } from "@/components/market/create-market-schedule-modal";
import { MemberStoreInitializer } from "@/components/store-initializer/member-store-initializer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, UserCheck } from "lucide-react";
import Link from "next/link";
import { getMessMembers } from "@/services/mess.service";

export default async function ManagerMarketSchedulesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center min-h-100 space-y-4 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground opacity-20" />
          <h2 className="text-lg font-bold">No Active Mess</h2>
          <p className="text-sm text-muted-foreground">
            Select a mess to manage market schedules.
          </p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const view =
    (typeof params.view === "string" ? params.view : params.view?.[0]) || "all";

  // Filter out UI-only params before sending to API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { view: _view, ...apiParams } = params;

  // Fetch both schedules and members in parallel for performance
  const [schedulesRes, membersRes] = await Promise.all([
    view === "my"
      ? getMyMarketDuties(activeMessId, apiParams)
      : getMarketSchedules(activeMessId, apiParams),
    getMessMembers(activeMessId, { status: "active", limit: "500" }),
  ]);

  const { data, meta } = schedulesRes;
  const members = membersRes?.success ? membersRes.data : [];

  return (
    <DashboardPageLayout>
      <MemberStoreInitializer members={members} />
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <DashboardPageHeader
          title="Market Schedules"
          description="Plan and assign bazaar/shopping duties to mess members."
        />
        <div className="flex items-center gap-3">
          <MarketScheduleFilters />
          <CreateMarketScheduleModal messId={activeMessId} />
        </div>
      </div>

      <Tabs value={view}>
        <TabsList
          variant="line"
        >
          <Link href="?view=all">
            <TabsTrigger value="all">
              <ShoppingCart />
              All History
            </TabsTrigger>
          </Link>
          <Link href="?view=my">
            <TabsTrigger value="my">
              <UserCheck />
              My Duties
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      <DataTable 
        columns={columns} 
        data={data || []} 
        meta={meta} 
      />
    </DashboardPageLayout>
  );
}

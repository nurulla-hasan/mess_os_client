import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { userMealOffColumns } from "@/components/meal-off-requests/user-columns";
import { 
  Clock, 
  CheckCircle2, 
  XCircle,
  Inbox
} from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMyMealOffRequests } from "@/services/meal-off-request.service";
import { CreateMealOffRequestModal } from "@/components/meals/create-off-request-modal";
import { SearchParams, QueryParams } from "@/types/global.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meal Off Requests | MessManager",
  description: "Request to skip meals for a specific date range.",
};

export default async function MemberMealOffRequestsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Meal Off Requests"
          description="Request to skip meals."
        />
        <Alert className="mt-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>No Active Mess</AlertTitle>
          <AlertDescription>Please join a mess to manage meal off requests.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const statusFilter = (typeof params.status === "string" ? params.status : params.status?.[0]) || "all";
  
  // Prepare API params - if status is 'all', don't send status filter
  const apiParams = { ...params };
  if (statusFilter === "all") delete apiParams.status;
  
  const { data, meta } = await getMyMealOffRequests(activeMessId, apiParams);
  
  const requests = data || [];

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Meal Off Requests"
          description="Request to skip meals for a specific date range. Manager approval is required."
        />
        <CreateMealOffRequestModal messId={activeMessId} />
      </div>

      <div className="space-y-4">
        <Tabs value={statusFilter} className="w-full">
          <TabsList variant="line">
            <Link href="?status=all">
              <TabsTrigger value="all" className="flex items-center gap-3">
                <Inbox className="h-4 w-4" />
                <span>All Requests</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=pending">
              <TabsTrigger value="pending" className="flex items-center gap-3 text-amber-500">
                <Clock className="h-4 w-4" />
                <span>Pending</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=approved">
              <TabsTrigger value="approved" className="flex items-center gap-3 text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                <span>Approved</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=rejected">
              <TabsTrigger value="rejected" className="flex items-center gap-3 text-rose-500">
                <XCircle className="h-4 w-4" />
                <span>Rejected</span>
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>

        <DataTable columns={userMealOffColumns} data={requests} meta={meta} />
      </div>
    </DashboardPageLayout>
  );
}


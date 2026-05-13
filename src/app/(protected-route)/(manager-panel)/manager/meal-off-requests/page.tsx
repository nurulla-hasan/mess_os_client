import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/off-requests-columns";
import { getMessMealOffRequests, getMyMealOffRequests } from "@/services/meal-off-request.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { AlertCircle, ClipboardList, UserCircle } from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { OffRequestFilters } from "@/components/meals/off-request-filters";
import { CreateMealOffRequestModal } from "@/components/meals/create-off-request-modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default async function ManagerMealOffRequestsPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to manage meal off requests.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const view = (typeof params.view === "string" ? params.view : params.view?.[0]) || "all";

  // Filter out UI-only params before sending to API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { view: _view, ...apiParams } = params;
  
  const { data, meta } = await (view === "my" 
    ? getMyMealOffRequests(activeMessId, apiParams)
    : getMessMealOffRequests(activeMessId, apiParams));

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Meal Off Requests"
          description="Review and manage member requests to stop meals for specific date ranges."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <OffRequestFilters />
          <CreateMealOffRequestModal messId={activeMessId} />
        </div>
      </div>

      <Tabs value={view}>
        <TabsList variant="line">
          <Link href="?view=all">
            <TabsTrigger value="all">
              <ClipboardList className="h-4 w-4" />
              All Requests
            </TabsTrigger>
          </Link>
          <Link href="?view=my">
            <TabsTrigger value="my">
              <UserCircle className="h-4 w-4" />
              My Requests
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

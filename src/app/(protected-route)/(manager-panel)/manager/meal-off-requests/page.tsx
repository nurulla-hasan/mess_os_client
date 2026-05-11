import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/off-requests-columns";
import { getMessMealOffRequests } from "@/services/meal-off-request.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { AlertCircle } from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { OffRequestFilters } from "@/components/meals/off-request-filters";

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
  const { data, meta } = await getMessMealOffRequests(activeMessId, params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <DashboardPageHeader
          title="Meal Off Requests"
          description="Review and manage member requests to stop meals for specific date ranges."
        />
        <OffRequestFilters />
      </div>

      <DataTable 
        columns={columns} 
        data={data || []} 
        meta={meta}
      />
    </DashboardPageLayout>
  );
}

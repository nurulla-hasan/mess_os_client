import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { memberMenuPlanColumns } from "@/components/menu-plans/member-columns";
import { 
  AlertCircle
} from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMenuPlans } from "@/services/menu-plan.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MenuPlanFilters } from "@/components/menu-plans/menu-plan-filters";

export default async function MemberMenuPlansPage({
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
          <p className="text-sm text-muted-foreground">Join a mess to see menu plans.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  
  // For members, we ALWAYS force status=published
  const apiParams = {
    ...params,
    status: "published"
  };

  const { data, meta } = await getMenuPlans(activeMessId, apiParams);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Menu Plans"
          description="View daily meal menus designed by the mess manager."
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <MenuPlanFilters showStatus={false} />
        </div>
      </div>

      <DataTable 
        columns={memberMenuPlanColumns} 
        data={data || []} 
        meta={meta}
      />
    </DashboardPageLayout>
  );
}

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/menu-plans/columns";
import { 
  AlertCircle
} from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMenuPlans } from "@/services/menu-plan.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MenuPlanFilters } from "@/components/menu-plans/menu-plan-filters";
import { CreateMenuPlanModal } from "@/components/menu-plans/create-menu-plan-modal";
import { AiGenerateMenuPlanModal } from "@/components/menu-plans/ai-generate-menu-plan-modal";

export default async function ManagerMenuPlansPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to manage menu plans.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const { data, meta } = await getMenuPlans(activeMessId, params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <DashboardPageHeader
          title="Menu Plans"
          description="Design and publish daily meal menus. Use AI to generate healthy meal ideas."
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <MenuPlanFilters />
          <div className="flex gap-2">
            <AiGenerateMenuPlanModal messId={activeMessId} />
            <CreateMenuPlanModal messId={activeMessId} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <DataTable 
          columns={columns} 
          data={data || []} 
          meta={meta} 
        />
      </div>
    </DashboardPageLayout>
  );
}

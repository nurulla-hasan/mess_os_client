import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle } from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getAiShoppingLists } from "@/services/ai-shopping.service";
import { getMenuPlans } from "@/services/menu-plan.service";
import { GenerateAiShoppingListModal } from "@/components/ai-shopping/generate-ai-shopping-list-modal";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/ai-shopping/columns";
import { AiShoppingFilters } from "@/components/ai-shopping/ai-shopping-filters";
import { QueryParams, SearchParams } from "@/types/global.type";

export default async function ManagerAiShoppingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center min-h-100 space-y-4 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground opacity-20" />
          <h2 className="text-lg font-bold">No Active Mess</h2>
          <p className="text-sm text-muted-foreground">
            Select a mess to use AI shopping.
          </p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const [listsRes, menuPlansRes] = await Promise.all([
    getAiShoppingLists(activeMessId, params),
    getMenuPlans(activeMessId, { limit: "100" }),
  ]);

  const lists = listsRes.data || [];
  const menuPlans = (menuPlansRes.data || []).filter(
    (plan) => plan.status !== "archived",
  );

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="AI Shopping Assistant"
          description="Generate automated shopping lists from your meal plans and convert them to market schedules."
        />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <AiShoppingFilters />
          <GenerateAiShoppingListModal
            messId={activeMessId}
            menuPlans={menuPlans}
          />
        </div>
      </div>

      <DataTable columns={columns} data={lists} meta={listsRes.meta} />
    </DashboardPageLayout>
  );
}

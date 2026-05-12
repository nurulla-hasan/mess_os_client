import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/columns";
import { getMessMeals } from "@/services/meal.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MealFilters } from "@/components/meals/meal-filters";
import { LogMealModal } from "@/components/meals/log-meal-modal";

export default async function ManagerMealsPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to manage meals.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  
  // Fetch meals from server with filters
  const { data, meta } = await getMessMeals(activeMessId, params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Meals Management"
          description="Log daily meals for members and monitor monthly consumption patterns."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <MealFilters />
          <LogMealModal messId={activeMessId} />
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={data || []} 
        meta={meta} 
      />
    </DashboardPageLayout>
  );
}

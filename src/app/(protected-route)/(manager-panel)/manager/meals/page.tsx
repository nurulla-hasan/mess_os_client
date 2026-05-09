import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/columns";
import { getMessMeals } from "@/services/meal.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MealFilters } from "@/components/meals/meal-filters";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <DashboardPageHeader
          title="Meals Management"
          description="Log daily meals for members and monitor monthly consumption patterns."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <MealFilters />
          <Button size="sm" className="w-full sm:w-auto h-9 font-bold">
            <Plus className="mr-2 h-4 w-4" /> Log Meal
          </Button>
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

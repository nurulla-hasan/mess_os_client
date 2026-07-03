import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/columns";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMessMeals } from "@/services/meal.service";
import { getEstimatedMealRate } from "@/services/mess.service";
import { 
  Utensils, 
  TrendingUp, 
  CheckCircle2
} from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MealFilters } from "@/components/meals/meal-filters";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meal Logs | MessManager",
  description: "View all meal consumption history for this mess.",
};

export default async function MemberMealsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Meal Logs"
          description="View mess meal consumption history."
        />
        <Alert className="mt-6">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>No Active Mess</AlertTitle>
          <AlertDescription>Please join a mess to see meal logs.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const [{ data, meta }, estimatedRateRes] = await Promise.all([
    getMessMeals(activeMessId, params),
    getEstimatedMealRate(activeMessId),
  ]);

  const estRate = estimatedRateRes?.data?.rate ?? 0;

  // Basic stats for the current month
  const totalMeals = data?.reduce((acc, m) => acc + (m.mealCount || 0), 0) || 0;

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Mess Meal Logs"
          description="View all meal consumption history for this mess."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <MealFilters showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Monthly Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Utensils className="h-4 w-4 text-primary" />
                Total Meals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalMeals}</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Meals Served This Month</p>
            </CardContent>
          </Card>

          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Estimated Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">
                {estRate > 0
                  ? `৳${(totalMeals * estRate).toFixed(0)}`
                  : "—"}
              </p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">
                {estRate > 0
                  ? `Based on ৳${estRate.toFixed(2)}/meal rate`
                  : "Add approved expenses to calculate rate"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Meal History Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Detailed History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data || []}
              meta={meta} />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

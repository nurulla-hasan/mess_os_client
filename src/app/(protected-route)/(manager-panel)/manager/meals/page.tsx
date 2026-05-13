import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle, Utensils, UserCircle } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/columns";
import { getMessMeals, getMyMeals } from "@/services/meal.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MealFilters } from "@/components/meals/meal-filters";
import { LogMealModal } from "@/components/meals/log-meal-modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

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
  const scope = (typeof params.scope === "string" ? params.scope : params.scope?.[0]) || "all";

  const { data, meta } = await (scope === "my" ? getMyMeals(activeMessId, params) : getMessMeals(activeMessId, params));

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

      <Tabs value={scope}>
        <TabsList variant="line">
          <Link href="?scope=all">
            <TabsTrigger value="all">
              <Utensils className="h-4 w-4" />
              All History
            </TabsTrigger>
          </Link>
          <Link href="?scope=my">
            <TabsTrigger value="my">
              <UserCircle className="h-4 w-4" />
              My Meals
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


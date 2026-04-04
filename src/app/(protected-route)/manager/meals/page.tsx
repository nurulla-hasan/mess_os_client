
import DashboardHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { SearchParams } from "@/types/global.type";


export default async function MealsPage({
  // searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // const params = await searchParams;
  
  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Meals"
        description="Daily meal distribution and summary for the month."
      />
    </DashboardPageLayout>
  );
}

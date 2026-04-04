import DashboardHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/page-layout";
import { SearchParams } from "@/types/global.type";

export default async function MembersPage({
  // searchParams,
}: {
  searchParams: SearchParams;
}) {
  // const params = await searchParams;
 
  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Member Management"
        description="Manage your mess members, active/inactive status, and removals."
      />

      {/* <DataTable data={members} columns={columns} meta={response?.meta} /> */}
    </DashboardPageLayout>
  );
}

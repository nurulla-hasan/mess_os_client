import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { ManagerRequestFilters } from "@/components/admin/manager-requests/manager-request-filters";
import { columns } from "@/components/admin/manager-requests/columns";
import { DataTable } from "@/components/ui/custom/data-table";
import { QueryParams, SearchParams } from "@/types/global.type";
import { getAllManagerRequests } from "@/services/admin.service";

export default async function AdminManagerRequestsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {

  const params = await searchParams as QueryParams;
  // Get All Manager Requests
  const { data, meta } = await getAllManagerRequests(params);

  return (
    <DashboardPageLayout>
      <div className="flex flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Manager Access Requests"
          description="Review and manage requests from users who want to elevate their role to Manager."
        />
        <ManagerRequestFilters />
      </div>

      <DataTable columns={columns} data={data} meta={meta} />
    </DashboardPageLayout>
  );
}

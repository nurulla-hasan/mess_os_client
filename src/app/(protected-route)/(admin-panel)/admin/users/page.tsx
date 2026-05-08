import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { UserFilters } from "@/components/admin/users/user-filters";
import { columns } from "@/components/admin/users/columns";
import { DataTable } from "@/components/ui/custom/data-table";
import { getAllUsers } from "@/services/admin.service";
import { QueryParams, SearchParams } from "@/types/global.type";

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams as QueryParams;
  const { data, meta } = await getAllUsers(params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <DashboardPageHeader
          title="Platform Users"
          description="Manage all registered users, adjust global roles, and handle account suspensions."
        />
        <UserFilters />
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        meta={meta}
      />
    </DashboardPageLayout>
  );
}

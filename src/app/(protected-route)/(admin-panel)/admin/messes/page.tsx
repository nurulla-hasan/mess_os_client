import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/admin/messes/columns";
import { getAllMesses } from "@/services/admin.service";
import { MessFilters } from "@/components/admin/messes/mess-filters";
import { QueryParams, SearchParams } from "@/types/global.type";

export default async function AdminMessesPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams as QueryParams;

  const { data, meta } = await getAllMesses(params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <DashboardPageHeader
          title="Platform Messes"
          description="Monitor all registered messes, track growth, and manage global mess statuses."
        />
        <MessFilters />
      </div>

      <DataTable 
        columns={columns} 
        data={data} 
        meta={meta}
      />
    </DashboardPageLayout>
  );
}

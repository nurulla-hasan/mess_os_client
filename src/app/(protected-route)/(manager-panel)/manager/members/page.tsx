import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/members/columns";
import { getMessMembers } from "@/services/mess.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MemberFilters } from "@/components/members/member-filters";
import { MemberStoreInitializer } from "@/components/store-initializer/member-store-initializer";

export default async function ManagerMembersPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to manage members.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  
  // Fetch members for the table and to initialize the store
  const { data, meta, success } = await getMessMembers(activeMessId, params);
  const members = success ? data : [];

  return (
    <DashboardPageLayout>
      {/* Initialize Member Store with the fetched data */}
      <MemberStoreInitializer members={members} />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <DashboardPageHeader
          title="Members Management"
          description="Oversee your community members and requests."
        />
        <MemberFilters />
      </div>

      <DataTable 
        columns={columns} 
        data={members} 
        meta={meta} 
      />
    </DashboardPageLayout>
  );
}

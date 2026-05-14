import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/complaints/columns";
import { MessageSquare } from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getComplaints } from "@/services/complaint.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { ComplaintFilters } from "@/components/complaints/complaint-filters";
import { CreateComplaintModal } from "@/components/complaints/create-complaint-modal";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function ManagerComplaintsPage({ searchParams }: Props) {
  const messId = await getActiveMessIdFromCookies();
  const params = (await searchParams) as QueryParams;

  if (!messId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold">No Active Mess Selected</h2>
          <p className="text-muted-foreground">Please select a mess to manage complaints.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  // Fetch complaints with filters
  const queryParams = { ...params };
  if (queryParams.status === "all") {
    delete queryParams.status;
  }

  const { data: complaints, meta } = await getComplaints(messId, queryParams);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Member Complaints"
          description="Review and address issues raised by mess members. Maintain a healthy community environment."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <ComplaintFilters />
          <CreateComplaintModal messId={messId} />
        </div>
      </div>

      <div>
        <DataTable 
          columns={columns} 
          data={complaints || []} 
          meta={meta}
        />
      </div>
    </DashboardPageLayout>
  );
}

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/complaints/columns";
import { 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare,
  Clock,
  XCircle
} from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getComplaints } from "@/services/complaint.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { CreateComplaintModal } from "@/components/complaints/create-complaint-modal";
import Link from "next/link";

export default async function MemberComplaintsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="My Complaints"
          description="Raise issues and track their progress."
        />
        <div className="mt-10 flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl bg-muted/30">
          <MessageSquare className="h-10 w-10 text-muted-foreground opacity-20 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Active Mess</h2>
          <p className="text-muted-foreground">Select a mess to view your complaints.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const statusFilter = (typeof params.status === "string" ? params.status : params.status?.[0]) || "all";

  // Filter out UI-only params before sending to API
  const apiParams = { ...params };
  if (statusFilter === "all") delete apiParams.status;

  // Backend standard: GET /complaints for member returns only own complaints
  const { data, meta } = await getComplaints(activeMessId, apiParams);
  const complaints = data || [];

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Complaints"
          description="Raise issues regarding mess facilities or services and track their resolution progress."
        />
        <CreateComplaintModal messId={activeMessId} />
      </div>

      <div className="space-y-4">
        <Tabs value={statusFilter} className="w-full">
          <TabsList variant="line">
            <Link href="?status=all">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>All My Issues</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=open">
              <TabsTrigger value="open" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>Open</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=in_progress">
              <TabsTrigger value="in_progress" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>In Progress</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=resolved">
              <TabsTrigger value="resolved" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Resolved</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=rejected">
              <TabsTrigger value="rejected" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                <span>Rejected</span>
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>

        <DataTable columns={columns} data={complaints} meta={meta} />
      </div>
    </DashboardPageLayout>
  );
}

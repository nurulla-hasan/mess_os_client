"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/complaints/columns";
import { mockComplaints } from "@/components/complaints/mockData";
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  MessageSquare
} from "lucide-react";

export default function ManagerComplaintsPage() {
  const openComplaints = mockComplaints.filter(c => c.status === "open");
  const inProgressComplaints = mockComplaints.filter(c => c.status === "in_progress");
  const resolvedComplaints = mockComplaints.filter(c => c.status === "resolved");

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Member Complaints"
        description="Review and address issues raised by mess members. Maintain a healthy community environment."
      />

      <div>
        <Tabs defaultValue="open" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="open" className="flex items-center gap-3">
              <AlertCircle className="h-4 w-4" />
              <span>Open ({openComplaints.length})</span>
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex items-center gap-3">
              <Clock className="h-4 w-4" />
              <span>In Progress</span>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4" />
              <span>Resolved</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4" />
              <span>All History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open">
            <DataTable columns={columns} data={openComplaints} />
          </TabsContent>
          
          <TabsContent value="in_progress">
            <DataTable columns={columns} data={inProgressComplaints} />
          </TabsContent>

          <TabsContent value="resolved">
            <DataTable columns={columns} data={resolvedComplaints} />
          </TabsContent>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockComplaints} searchKey="title" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


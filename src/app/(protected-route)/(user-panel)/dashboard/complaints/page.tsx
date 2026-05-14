"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/complaints/columns";
import { mockComplaints } from "@/components/complaints/mockData";
import { 
  AlertCircle, 
  CheckCircle2, 
  Plus,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberComplaintsPage() {
  const myComplaints = mockComplaints.filter(c => c.messMemberId.user.fullName === "Nasir Uddin");
  const openComplaints = myComplaints.filter(c => c.status === "open");
  const resolvedComplaints = myComplaints.filter(c => c.status === "resolved");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Complaints"
          description="Raise issues regarding mess facilities or services and track their resolution progress."
        />
        <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> New Complaint
        </Button>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4" />
              <span>All My Issues</span>
            </TabsTrigger>
            <TabsTrigger value="open" className="flex items-center gap-3">
              <AlertCircle className="h-4 w-4" />
              <span>Open ({openComplaints.length})</span>
            </TabsTrigger>
            <TabsTrigger value="resolved" className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4" />
              <span>Resolved</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={myComplaints} searchKey="title" />
          </TabsContent>
          
          <TabsContent value="open">
            <DataTable columns={columns} data={openComplaints} />
          </TabsContent>

          <TabsContent value="resolved">
            <DataTable columns={columns} data={resolvedComplaints} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns, MealOffRequest } from "@/components/meals/off-requests-columns";
import { 
  History,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";

const mockOffRequests: MealOffRequest[] = [
  {
    id: "or1",
    member: { name: "Golap Hasan", email: "golap@example.com" },
    startDate: "2024-05-10T00:00:00Z",
    endDate: "2024-05-12T00:00:00Z",
    reason: "Going to home for weekend",
    status: "pending",
    submittedAt: "2024-05-06T10:00:00Z",
  },
  {
    id: "or2",
    member: { name: "Rahim Uddin", email: "rahim@example.com" },
    startDate: "2024-05-15T00:00:00Z",
    endDate: "2024-05-20T00:00:00Z",
    reason: "Family vacation",
    status: "approved",
    submittedAt: "2024-05-04T12:00:00Z",
  },
];

export default function ManagerMealOffRequestsPage() {
  const pendingRequests = mockOffRequests.filter(r => r.status === "pending");
  const approvedRequests = mockOffRequests.filter(r => r.status === "approved");
  const rejectedRequests = mockOffRequests.filter(r => r.status === "rejected");

  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Meal Off Requests"
        description="Review and manage member requests to stop meals for specific date ranges."
      />

      <div>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Pending ({pendingRequests.length})</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Approved</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>Rejected</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <DataTable columns={columns} data={pendingRequests} />
          </TabsContent>
          
          <TabsContent value="approved">
            <DataTable columns={columns} data={approvedRequests} />
          </TabsContent>

          <TabsContent value="rejected">
            <DataTable columns={columns} data={rejectedRequests} />
          </TabsContent>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockOffRequests} searchKey="member_name" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}

"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { userMealOffColumns } from "@/components/meal-off-requests/user-columns";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberMealOffRequestsPage() {
  const myRequests: any[] = [];
  const pendingRequests = myRequests.filter(r => r.status === "pending");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Meal Off Requests"
          description="Request to skip meals for a specific date range. Manager approval is required."
        />
        <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>

      <div className="mt-2">
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>My Requests</span>
            </TabsTrigger>
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
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={userMealOffColumns} data={myRequests} />
          </TabsContent>
          
          <TabsContent value="pending">
            <DataTable columns={userMealOffColumns} data={pendingRequests} />
          </TabsContent>

          <TabsContent value="approved">
            <DataTable columns={userMealOffColumns} data={myRequests.filter(r => r.status === "approved")} />
          </TabsContent>

          <TabsContent value="rejected">
            <DataTable columns={userMealOffColumns} data={myRequests.filter(r => r.status === "rejected")} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


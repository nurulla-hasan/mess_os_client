"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/market/columns";
import { mockSchedules } from "@/components/market/mockData";
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  Plus,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerMarketSchedulesPage() {
  const pendingSchedules = mockSchedules.filter(s => s.status === "pending");
  const completedSchedules = mockSchedules.filter(s => s.status === "completed");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardHeader
          title="Market Schedules"
          description="Plan and assign bazaar/shopping duties to mess members."
        />
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Create Schedule
        </Button>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Pending</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </TabsTrigger>
            <TabsTrigger value="my-duties" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span>My Duties</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>All History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <DataTable columns={columns} data={pendingSchedules} />
          </TabsContent>
          
          <TabsContent value="completed">
            <DataTable columns={columns} data={completedSchedules} />
          </TabsContent>

          <TabsContent value="my-duties">
            <DataTable columns={columns} data={mockSchedules.filter(s => s.assignedMembers.some(m => m.name === "Golap Hasan"))} />
          </TabsContent>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockSchedules} searchKey="status" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}

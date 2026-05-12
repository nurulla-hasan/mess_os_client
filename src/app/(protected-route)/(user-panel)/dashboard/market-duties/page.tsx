"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/market/columns";
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { IMarketSchedule } from "@/types/market-schedule.type";

export default function MemberMarketDutiesPage() {
  const myDuties: IMarketSchedule[] = [];
  const upcomingDuties = myDuties.filter(s => s.status === "pending");
  const completedDuties = myDuties.filter(s => s.status === "completed");

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="My Market Duties"
        description="Track your assigned bazaar days, view shopping lists, and record actual expenditures."
      />

      <div className="mt-2">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Upcoming ({upcomingDuties.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>All History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <DataTable columns={columns} data={upcomingDuties} />
          </TabsContent>
          
          <TabsContent value="completed">
            <DataTable columns={columns} data={completedDuties} />
          </TabsContent>

          <TabsContent value="all">
            <DataTable columns={columns} data={myDuties} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <p className="text-xs font-bold text-amber-700">Reporting Tip</p>
          <p className="text-xs text-amber-600 leading-relaxed">
            Please make sure to collect all receipts during bazaar. You need to record the final amount spent to update the mess balance accurately.
          </p>
        </div>
      </div>
    </DashboardPageLayout>
  );
}


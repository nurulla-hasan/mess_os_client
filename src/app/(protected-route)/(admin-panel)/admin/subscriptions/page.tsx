"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/admin/subscriptions/columns";
import { mockAdminSubscriptions } from "@/components/admin/subscriptions/mockData";
import { 
  CreditCard, 
  Zap, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminSubscriptionsPage() {
  const activeSubs = mockAdminSubscriptions.filter(s => s.status === "active");
  const trials = mockAdminSubscriptions.filter(s => s.status === "trial");
  const expired = mockAdminSubscriptions.filter(s => s.status === "expired");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Subscriptions & Revenue"
          description="Monitor platform subscriptions, track revenue per mess, and manage billing cycles."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download /> Export Report
          </Button>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Monthly Recurring Revenue</span>
            </div>
            <p className="text-xl font-black">৳12,500</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-emerald-500">
              <Zap className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Active Subscriptions</span>
            </div>
            <p className="text-xl font-black">{activeSubs.length + trials.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-rose-500/5 border-rose-500/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Expired / Canceled</span>
            </div>
            <p className="text-xl font-black">{expired.length}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>All Subscriptions</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Active Plans</span>
            </TabsTrigger>
            <TabsTrigger value="trials" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Trials</span>
            </TabsTrigger>
            <TabsTrigger value="expired" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Issues / Expired</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockAdminSubscriptions} searchKey="messName" />
          </TabsContent>
          
          <TabsContent value="active">
            <DataTable columns={columns} data={activeSubs} />
          </TabsContent>

          <TabsContent value="trials">
            <DataTable columns={columns} data={trials} />
          </TabsContent>

          <TabsContent value="expired">
            <DataTable columns={columns} data={expired} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}

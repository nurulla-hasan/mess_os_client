"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/payments/columns";
import { mockPayments } from "@/components/payments/mockData";
import { 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  TrendingUp,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerPaymentsPage() {
  const pendingPayments = mockPayments.filter(p => p.status === "pending");
  const approvedPayments = mockPayments.filter(p => p.status === "approved");
  const rejectedPayments = mockPayments.filter(p => p.status === "rejected");

  const totalReceived = approvedPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Payments Management"
          description="Track and review all member deposits and mess payments."
        />
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button size="sm">
            <CreditCard className="mr-2 h-4 w-4" /> Add Payment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingPayments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedPayments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-500/5 border-rose-500/20">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-rose-500/20">
                <XCircle className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">{rejectedPayments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Received</p>
                <p className="text-2xl font-bold">৳{totalReceived}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Table */}
      <div className="mt-2">
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockPayments} searchKey="member_name" />
          </TabsContent>
          
          <TabsContent value="pending">
            <DataTable columns={columns} data={pendingPayments} />
          </TabsContent>

          <TabsContent value="approved">
            <DataTable columns={columns} data={approvedPayments} />
          </TabsContent>

          <TabsContent value="rejected">
            <DataTable columns={columns} data={rejectedPayments} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


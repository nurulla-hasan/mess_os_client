"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { userPaymentColumns } from "@/components/payments/user-columns";
import { mockPayments } from "@/components/payments/mockData";
import { 
  Plus, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Wallet,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberPaymentsPage() {
  const myPayments = mockPayments.filter(p => p.member.name === "Nasir Uddin");
  const pendingPayments = myPayments.filter(p => p.status === "pending");
  const approvedPayments = myPayments.filter(p => p.status === "approved");
  const totalApproved = approvedPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Payments"
          description="View your deposit history and submit new payment records for approval."
        />
        <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Submit Payment
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-primary">
              <Wallet className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Approved</span>
            </div>
            <p className="text-xl font-bold">৳{totalApproved}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-amber-500">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Pending Approval</span>
            </div>
            <p className="text-xl font-bold">৳{pendingPayments.reduce((acc, p) => acc + p.amount, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Submitted</span>
            </div>
            <p className="text-xl font-bold">৳{myPayments.reduce((acc, p) => acc + p.amount, 0)}</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-3">
              <CreditCard className="h-4 w-4" />
              <span>All History</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-3">
              <Clock className="h-4 w-4" />
              <span>Pending</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4" />
              <span>Approved</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-3">
              <XCircle className="h-4 w-4" />
              <span>Rejected</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={userPaymentColumns} data={myPayments} />
          </TabsContent>
          
          <TabsContent value="pending">
            <DataTable columns={userPaymentColumns} data={pendingPayments} />
          </TabsContent>

          <TabsContent value="approved">
            <DataTable columns={userPaymentColumns} data={approvedPayments} />
          </TabsContent>

          <TabsContent value="rejected">
            <DataTable columns={userPaymentColumns} data={myPayments.filter(p => p.status === "rejected")} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


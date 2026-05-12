"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { userExpenseColumns } from "@/components/expenses/user-columns";
import { mockExpenses } from "@/components/expenses/mockData";
import { 
  Plus, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Wallet,
  ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberExpensesPage() {
  const myExpenses = mockExpenses.filter(e => e.paidBy.name === "Nasir Uddin");
  const pendingExpenses = myExpenses.filter(e => e.status === "pending");
  const approvedExpenses = myExpenses.filter(e => e.status === "approved");
  const totalApproved = approvedExpenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Expenses"
          description="Track mess-related expenses you've paid and manage reimbursement status."
        />
        <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Create Expense
        </Button>
      </div>

      {/* Expense Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-rose-500/5 border-rose-500/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-rose-500">
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
            <p className="text-xl font-bold">৳{pendingExpenses.reduce((acc, e) => acc + e.amount, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-emerald-500">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Reimbursed</span>
            </div>
            <p className="text-xl font-bold">৳0</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-3">
              <Receipt className="h-4 w-4" />
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
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={userExpenseColumns} data={myExpenses} />
          </TabsContent>
          
          <TabsContent value="pending">
            <DataTable columns={userExpenseColumns} data={pendingExpenses} />
          </TabsContent>

          <TabsContent value="approved">
            <DataTable columns={userExpenseColumns} data={approvedExpenses} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


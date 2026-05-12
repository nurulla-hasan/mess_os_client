"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/expenses/columns";
import { mockExpenses } from "@/components/expenses/mockData";
import { 
  ReceiptText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerExpensesPage() {
  const pendingExpenses = mockExpenses.filter(e => e.status === "pending");
  const approvedExpenses = mockExpenses.filter(e => e.status === "approved");
  const monthlyTotal = approvedExpenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Expenses Management"
          description="Manage all mess expenditures, bazar costs, and utility bills."
        />
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Create Expense
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingExpenses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedExpenses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <ReceiptText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Total</p>
                <p className="text-2xl font-bold">৳{monthlyTotal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-500/5 border-rose-500/20">
          <CardContent >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-rose-500/20">
                <XCircle className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Table */}
      <div className="mt-2">
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all">All Expenses</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockExpenses} searchKey="paidBy_name" />
          </TabsContent>
          
          <TabsContent value="pending">
            <DataTable columns={columns} data={pendingExpenses} />
          </TabsContent>

          <TabsContent value="approved">
            <DataTable columns={columns} data={approvedExpenses} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


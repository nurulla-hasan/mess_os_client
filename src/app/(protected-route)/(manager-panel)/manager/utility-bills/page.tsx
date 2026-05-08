"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/utility-bills/columns";
import { mockUtilityBills } from "@/components/utility-bills/mockData";
import { 
  Plus, 
  Filter, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerUtilityBillsPage() {
  const pendingBills = mockUtilityBills.filter(b => b.status === "pending");
  const paidBills = mockUtilityBills.filter(b => b.status === "paid");
  const totalCost = mockUtilityBills.filter(b => b.month === "May").reduce((acc, b) => acc + b.amount, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Utility Bills"
          description="Manage shared mess utilities like rent, electricity, and internet bills."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Create Bill
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent>
            <div className="flex items-center gap-4 py-6">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{pendingBills.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent>
            <div className="flex items-center gap-4 py-6">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold">{paidBills.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent>
            <div className="flex items-center gap-4 py-6">
              <div className="p-2 rounded-lg bg-primary/20">
                <Receipt className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Total</p>
                <p className="text-2xl font-bold">৳{totalCost}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-500/5 border-rose-500/20">
          <CardContent>
            <div className="flex items-center gap-4 py-6">
              <div className="p-2 rounded-lg bg-rose-500/20">
                <Calendar className="h-5 w-5 text-rose-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Due</p>
                <p className="text-2xl font-bold">May 10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-2">
        <DataTable columns={columns} data={mockUtilityBills} searchKey="category" />
      </div>
    </DashboardPageLayout>
  );
}


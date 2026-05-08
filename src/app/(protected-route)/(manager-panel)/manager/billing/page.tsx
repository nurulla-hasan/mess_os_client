"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/billing/columns";
import { mockMemberBills } from "@/components/billing/mockData";
import { 
  Calculator, 
  AlertTriangle,
  History,
  FileText,
  Save,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManagerBillingPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Billing Management"
          description="Finalize monthly billing, calculate meal rates, and manage member invoices."
        />
        <div className="flex items-center gap-2">
          <Select defaultValue="may-2024">
            <SelectTrigger className="w-45">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may-2024">May 2024</SelectItem>
              <SelectItem value="apr-2024">April 2024</SelectItem>
              <SelectItem value="mar-2024">March 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" /> History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Billing Overview Card */}
        <Card className="lg:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Cycle Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="pending">Open</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Meal Rate</span>
              <span className="text-lg font-bold text-primary">৳30.00</span>
            </div>
            <Separator className="bg-primary/10" />
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Total Meals</span>
                <span className="font-medium">458</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Total Meal Expenses</span>
                <span className="font-medium">৳13,740</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Equal Share Expenses</span>
                <span className="font-medium">৳2,400</span>
              </div>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <Button className="w-full shadow-lg shadow-primary/20">
                <Save className="mr-2 h-4 w-4" /> Save Preview
              </Button>
              <Button variant="outline" className="w-full">
                <Lock className="mr-2 h-4 w-4" /> Finalize Cycle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Member Bills Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Member Bills
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="success" className="text-xs">3 Paid</Badge>
              <Badge variant="pending" className="text-xs">2 Pending</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={mockMemberBills} searchKey="member_name" />
          </CardContent>
        </Card>
      </div>

      {/* Operational Warnings/Notes */}
      <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <p>
          Billing for **May 2024** is currently in **Preview Mode**. You can update meal rates or expenses before finalizing. 
          Once finalized, bills will be visible to members and cannot be edited without reopening the cycle.
        </p>
      </div>
    </DashboardPageLayout>
  );
}

// Add missing icons and component for Billing
import { Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";


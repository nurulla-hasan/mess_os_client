"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  FileText, 
  Download, 
  Filter, 
  Calendar,
  Wallet,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function MemberReportsPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Statements & Reports"
          description="View your personal financial statements and overall mess operational summaries."
        />
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Selector & Filters */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Filter className="h-4 w-4 text-primary" />
                Select Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Report Category</p>
                <Select defaultValue="personal">
                  <SelectTrigger className="w-full">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">My Monthly Statement</SelectItem>
                    <SelectItem value="mess-summary">Mess Operational Summary</SelectItem>
                    <SelectItem value="expenses">Expense Overview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Billing Month</p>
                <Select defaultValue="may-2024">
                  <SelectTrigger className="w-full h-9">
                    <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="may-2024">May 2024</SelectItem>
                    <SelectItem value="apr-2024">April 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Preview Report</Button>
            </CardContent>
          </Card>
        </div>

        {/* Report Preview Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center gap-3 text-primary">
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Total Paid (Cycle)</span>
                </div>
                <p className="text-xl font-bold">৳2,000</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-500/5 border-emerald-500/20">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center gap-3 text-emerald-500">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Meal Consumption</span>
                </div>
                <p className="text-xl font-bold">42 Meals</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                Preview: My Monthly Statement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Financial Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deposits / Payments</span>
                      <span className="font-bold text-emerald-600">৳2,000.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Consumption</span>
                      <span className="font-bold text-rose-600">৳1,890.00</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm font-bold">
                      <span>Projected Balance</span>
                      <span className="text-emerald-600">৳110.00</span>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/30 p-4 rounded-lg border border-dashed border-primary/20">
                  <p className="text-xs text-muted-foreground leading-relaxed italic text-center">
                    This report is for informational purposes. Final monthly statements are issued after the billing cycle is closed by the manager.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}


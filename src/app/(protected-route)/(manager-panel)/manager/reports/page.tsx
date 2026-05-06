"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  FileText,
  Download,
  Filter,
  Calendar,
  LineChart,
  TrendingUp,
  Wallet,
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
import { Badge } from "@/components/ui/badge";

export default function ManagerReportsPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardHeader
          title="Operational Reports"
          description="View financial summaries, member statements, and operational performance metrics."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download /> Export CSV
          </Button>
          <Button size="sm">
            <Download /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Selector & Filters */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                Report Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Report Type
                </p>
                <Select defaultValue="summary">
                  <SelectTrigger className="w-full">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Operational Summary</SelectItem>
                    <SelectItem value="financial">Financial Ledger</SelectItem>
                    <SelectItem value="members">Member Statements</SelectItem>
                    <SelectItem value="expenses">Expense Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  Select Month
                </p>
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
              <Button className="w-full">Generate Report</Button>
            </CardContent>
          </Card>
        </div>

        {/* Report Preview Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Total Revenue
                  </span>
                </div>
                <p className="text-xl font-black">৳45,000</p>
              </CardContent>
            </Card>
            <Card className="bg-rose-500/5 border-rose-500/20">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-rose-500">
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Total Expense
                  </span>
                </div>
                <p className="text-xl font-black">৳38,450</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-500/5 border-emerald-500/20">
              <CardContent className="p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-emerald-500">
                  <LineChart className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Net Balance
                  </span>
                </div>
                <p className="text-xl font-black">৳6,550</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                Report Preview: Operational Summary
              </CardTitle>
              <Badge variant="success">Finalized</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6 space-y-8">
                {/* Mock data visualization placeholder */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold">Meal Statistics</h4>
                      <p className="text-xs text-muted-foreground">
                        Total meals served this month.
                      </p>
                    </div>
                    <p className="text-2xl font-black">458 Meals</p>
                  </div>
                  <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%]" />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Expense Breakdown
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Bazar Costs</span>
                        <span className="font-bold">৳24,500</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Utility Bills</span>
                        <span className="font-bold">৳12,000</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Other Expenses</span>
                        <span>৳1,950</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Payment Summary
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Collected</span>
                        <span className="font-bold text-emerald-600">
                          ৳42,000
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Outstanding Due</span>
                        <span className="font-bold text-rose-600">৳3,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

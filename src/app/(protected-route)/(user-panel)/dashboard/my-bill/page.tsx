"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileText, 
  Download, 
  Calendar, 
  ArrowUpRight,
  ArrowDownRight,
  CreditCard
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
import { Separator } from "@/components/ui/separator";

export default function MemberMyBillPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Personal Bill"
          description="View your detailed meal charges, share costs, and final payment status for each cycle."
        />
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Bill Info & Status */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Calendar className="h-4 w-4 text-primary" />
                Select Cycle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select defaultValue="may-2024">
                <SelectTrigger>
                  <SelectValue placeholder="Select Cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="may-2024">May 2024 (Current)</SelectItem>
                  <SelectItem value="apr-2024">April 2024</SelectItem>
                </SelectContent>
              </Select>
              
              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground uppercase font-bold">Status</span>
                  <Badge variant="pending">NOT FINALIZED</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground uppercase font-bold">Generated On</span>
                  <span className="font-medium">-</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Estimated Balance</h3>
              <p className="text-3xl font-bold text-primary">৳450</p>
              <Badge variant="rejected" className="mt-2 h-5 text-xs uppercase">Pending Due</Badge>
              <p className="text-xs text-muted-foreground mt-4 italic">Final amount may change after cycle ends.</p>
            </CardContent>
          </Card>
        </div>

        {/* Bill Detailed Breakdown */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <FileText className="h-4 w-4 text-primary" />
                Detailed Bill Breakdown
              </CardTitle>
              <CardDescription>May 01 - May 30, 2024</CardDescription>
            </div>
            <Badge variant="outline" className="h-6">PREVIEW</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 space-y-8">
              {/* Consumption Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Consumption & Shares
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-3">
                      Meal Charges <span className="text-xs text-muted-foreground">(42 meals × ৳45.00)</span>
                    </span>
                    <span className="font-bold">৳1,890.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-3">
                      Equal Shares <span className="text-xs text-muted-foreground">(Rent, Internet, Maid)</span>
                    </span>
                    <span className="font-bold">৳1,500.00</span>
                  </div>
                  <Separator className="my-1 opacity-50" />
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total Billable Amount</span>
                    <span className="text-rose-600">৳3,390.00</span>
                  </div>
                </div>
              </div>

              {/* Credits & Payments Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <ArrowDownRight className="h-3.5 w-3.5 text-emerald-500" />
                  Credits & Payments
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-3">
                      Total Payments <span className="text-xs text-muted-foreground">(Submitted Deposits)</span>
                    </span>
                    <span className="font-bold text-emerald-600">৳2,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-3">
                      Personal Expenses <span className="text-xs text-muted-foreground">(Adjusted from bazar)</span>
                    </span>
                    <span className="font-bold text-emerald-600">৳940.00</span>
                  </div>
                  <Separator className="my-1 opacity-50" />
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total Credits Adjusted</span>
                    <span className="text-emerald-600">৳2,940.00</span>
                  </div>
                </div>
              </div>

              {/* Final Summary Card */}
              <div className="bg-accent/30 p-4 rounded-lg border border-dashed border-primary/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Net Payable Amount</p>
                    <p className="text-lg font-bold">৳450.00</p>
                  </div>
                </div>
                <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
                  Pay Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}


"use client";

import React from "react";
import { IMemberBill } from "@/types/billing.type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight, 
  Hash,
  Calculator,
  Wallet,
  Scale,
  CheckCircle2
} from "lucide-react";

interface BillDetailsProps {
  bill: IMemberBill;
}

export function BillDetails({ bill }: BillDetailsProps) {
  const { summary } = bill;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-background space-y-2">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Hash className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Meals</span>
          </div>
          <p className="text-2xl font-bold">{summary.meals}</p>
        </div>

        <div className="p-4 rounded-xl border bg-background space-y-2">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Calculator className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Meal Rate</span>
          </div>
          <p className="text-2xl font-bold">৳{summary.mealRate.toFixed(2)}</p>
        </div>

        <div className="p-4 rounded-xl border bg-background space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <Receipt className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Meal Charge</span>
          </div>
          <p className="text-2xl font-bold">৳{summary.mealCharge.toLocaleString()}</p>
        </div>

        <div className="p-4 rounded-xl border bg-background space-y-2">
          <div className="flex items-center gap-3 text-amber-500">
            <Scale className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Equal Shares</span>
          </div>
          <p className="text-2xl font-bold">৳{summary.equalShare.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bill Breakdown */}
        <Card className="shadow-none border-muted-foreground/10">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-3">
              <Receipt className="h-5 w-5 text-primary" />
              Charge Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-1">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Meal Charges</span>
                <span className="text-xs text-muted-foreground">
                  {summary.meals} Meals × ৳{summary.mealRate.toFixed(2)}
                </span>
              </div>
              <span className="font-bold">৳{summary.mealCharge.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center py-1">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Equal Shared Costs</span>
                <span className="text-xs text-muted-foreground">Utility, maid, WiFi, etc.</span>
              </div>
              <span className="font-bold">৳{summary.equalShare.toLocaleString()}</span>
            </div>

            <Separator className="opacity-50" />

            <div className="flex justify-between items-center py-2 text-primary">
              <span className="font-bold">Total Billable Amount</span>
              <span className="text-lg font-black tracking-tight">৳{summary.finalPayable.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="shadow-none border-muted-foreground/10 bg-muted/5">
          <CardHeader>
            <CardTitle className="text-base font-bold flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary" />
              Payment & Credits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Previous Due</span>
              <span className="font-bold text-rose-500">৳{summary.previousDue.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Total Paid / Credits</span>
              <span className="font-bold text-emerald-500">৳{summary.totalPaymentsAndCredits.toLocaleString()}</span>
            </div>

            <Separator className="opacity-50" />

            {summary.finalDue > 0 ? (
              <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3 text-rose-600">
                  <ArrowUpRight className="h-5 w-5" />
                  <span className="font-bold">Net Payable (Due)</span>
                </div>
                <span className="text-xl font-black text-rose-600">৳{summary.finalDue.toLocaleString()}</span>
              </div>
            ) : summary.finalAdvance > 0 ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3 text-emerald-600">
                  <ArrowDownRight className="h-5 w-5" />
                  <span className="font-bold">Advance Balance</span>
                </div>
                <span className="text-xl font-black text-emerald-600">৳{summary.finalAdvance.toLocaleString()}</span>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-muted border flex items-center justify-between">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold">Bill Settled</span>
                </div>
                <span className="text-xl font-black">৳0</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

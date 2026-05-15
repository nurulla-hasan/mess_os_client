"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IFinancialReport } from "@/types/report.type";
import {  
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface FinancialReportViewProps {
  data: IFinancialReport;
}

export function FinancialReportView({ data }: FinancialReportViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateMonth = (delta: number) => {
    let m = data.month + delta;
    let y = data.year;
    if (m > 12) { m = 1; y++; }
    if (m < 1) { m = 12; y--; }
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", m.toString());
    params.set("year", y.toString());
    router.push(`?${params.toString()}`);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Month Selector */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-black uppercase tracking-tight">{monthNames[data.month - 1]} {data.year}</h3>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Financial Period</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon-sm" onClick={() => updateMonth(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon-sm" onClick={() => updateMonth(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meal Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <TrendingDown className="h-3.5 w-3.5" /> Meal Consumption & Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Meals</p>
                  <p className="text-3xl font-black">{data.summary.totalMeals}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Meal Rate</p>
                  <p className="text-2xl font-black text-emerald-600">৳{data.summary.mealRate.toFixed(2)}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-muted-foreground uppercase">Total Meal Expense</span>
                  <span className="text-lg font-black">৳{data.summary.totalMealExpense.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Expenses Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5" /> Other Shared Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Equal Share</p>
                <p className="text-3xl font-black text-rose-600">৳{data.summary.totalEqualShareExpense.toLocaleString()}</p>
              </div>
              <p className="text-[11px] text-muted-foreground font-medium leading-relaxed italic">
                * This amount is divided equally among all mess members participating in shared expenses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 rounded-2xl bg-muted/20 border border-dashed flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs font-bold text-muted-foreground uppercase">Cycle Status: <Badge variant={data.status === "finalized" ? "success" : "warning"} className="ml-1 uppercase text-[10px] h-4">{data.status}</Badge></span>
        </div>
        {data.finalizedAt && (
          <span className="text-[10px] font-bold text-muted-foreground uppercase">Finalized on: {formatDate(data.finalizedAt)}</span>
        )}
      </div>
    </div>
  );
}

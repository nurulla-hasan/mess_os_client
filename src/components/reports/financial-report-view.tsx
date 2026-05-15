"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { IFinancialReport } from "@/types/report.type";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FinancialReportViewProps {
  data: IFinancialReport;
  role: "manager" | "member";
}

export function FinancialReportView({ data }: FinancialReportViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateMonth = (delta: number) => {
    let m = data.month + delta;
    let y = data.year;

    if (m > 12) {
      m = 1;
      y++;
    }

    if (m < 1) {
      m = 12;
      y--;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("month", m.toString());
    params.set("year", y.toString());

    router.push(`?${params.toString()}`);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Calendar className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold leading-none">
                  {monthNames[data.month - 1]} {data.year}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize font-medium">
                    {data.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Period Overview</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateMonth(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="h-4 w-px bg-border mx-1" />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateMonth(1)}
                disabled={
                  data.year > new Date().getFullYear() || 
                  (data.year === new Date().getFullYear() && data.month >= new Date().getMonth() + 1)
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-primary" />
              Meal Expense Insights
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/40 p-4 border">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Total Meals</p>
                  <p className="text-2xl font-bold">{data.summary.totalMeals}</p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4 text-right border">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Meal Rate</p>
                  <p className="text-2xl font-bold text-emerald-600">৳{data.summary.mealRate.toFixed(2)}</p>
                </div>
              </div>

              <div className="rounded-xl border border-dashed p-4 flex items-center justify-between bg-primary/5">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Total Meal Expense</span>
                <span className="text-xl font-bold text-primary">৳{data.summary.totalMealExpense.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-rose-600" />
              Shared Overhead Costs
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="rounded-xl bg-rose-500/5 p-6 border border-rose-500/10 text-center">
                <p className="text-xs font-medium text-rose-600 uppercase tracking-widest mb-1">Total Shared Expense</p>
                <p className="text-4xl font-bold text-rose-600">৳{data.summary.totalEqualShareExpense.toLocaleString()}</p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4 flex gap-3 items-center">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground font-medium">
                  Divided equally among all mess members.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {data.finalizedAt && (
        <Card className="bg-muted/50">
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">Cycle Finalized on {formatDate(data.finalizedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
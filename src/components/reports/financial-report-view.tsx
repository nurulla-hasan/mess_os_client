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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
        <CardContent>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-semibold tracking-tight">
                  {monthNames[data.month - 1]} {data.year}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Financial period overview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl"
                onClick={() => updateMonth(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-2xl"
                onClick={() => updateMonth(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-muted">
                <TrendingDown className="h-4 w-4 text-primary" />
              </span>
              Meal Consumption & Expense
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-muted/40 p-5">
                <p className="text-sm text-muted-foreground">Total Meals</p>
                <p className="mt-2 text-4xl font-bold tracking-tight">
                  {data.summary.totalMeals}
                </p>
              </div>

              <div className="rounded-3xl bg-muted/40 p-5 text-right">
                <p className="text-sm text-muted-foreground">Meal Rate</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-emerald-600">
                  ৳{data.summary.mealRate.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Total Meal Expense
                </span>
                <span className="text-xl font-semibold tracking-tight">
                  ৳{data.summary.totalMealExpense.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-muted">
                <TrendingUp className="h-4 w-4 text-primary" />
              </span>
              Other Shared Expenses
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-3xl bg-muted/40 p-6">
              <p className="text-sm text-muted-foreground">
                Total Equal Share
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-rose-600">
                ৳{data.summary.totalEqualShareExpense.toLocaleString()}
              </p>
            </div>

            <div className="rounded-3xl border bg-card p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                This amount is divided equally among all mess members
                participating in shared expenses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden rounded-3xl border-border/60 shadow-sm">
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Cycle Status</p>
                <div>
                  <Badge
                    variant={
                      data.status === "finalized" ? "success" : "warning"
                    }
                    className="rounded-full px-3 py-1 capitalize"
                  >
                    {data.status}
                  </Badge>
                </div>
              </div>
            </div>

            {data.finalizedAt && (
              <div className="rounded-2xl bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                Finalized on:{" "}
                <span className="font-medium text-foreground">
                  {formatDate(data.finalizedAt)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
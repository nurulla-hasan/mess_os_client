"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  UtensilsCrossed, 
  Receipt, 
  CalendarDays,
  UserCheck,
  TrendingUp
} from "lucide-react";
import { IFinancialReport } from "@/types/report.type";
import { formatDate } from "@/lib/utils";

interface FinancialLedgerViewProps {
  report: IFinancialReport | null;
  isLoading?: boolean;
}

export function FinancialLedgerView({ report, isLoading }: FinancialLedgerViewProps) {
  if (isLoading) {
    return <div className="h-100 bg-accent/10 rounded-xl animate-pulse" />;
  }

  if (!report || !report.summary) {
    return (
      <Card className="border-dashed">
        <CardContent className="h-75 flex flex-col items-center justify-center text-center p-6">
          <CalendarDays className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
          <p className="font-bold">No Financial Data</p>
          <p className="text-sm text-muted-foreground">Select a month and year to view financial details.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-primary">
              <UtensilsCrossed className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase">Total Meals</span>
            </div>
            <p className="text-xl font-bold">{report.summary?.totalMeals ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-rose-500">
              <Receipt className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase">Meal Expense</span>
            </div>
            <p className="text-xl font-bold">৳{(report.summary?.totalMealExpense ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-amber-500">
              <Receipt className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase">Other Expense</span>
            </div>
            <p className="text-xl font-bold">৳{(report.summary?.totalEqualShareExpense ?? 0).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="flex flex-col gap-1">
            <div className="flex items-center gap-2 opacity-80">
              <Calculator className="h-3.5 w-3.5" />
              <span className="text-xs font-bold uppercase">Meal Rate</span>
            </div>
            <p className="text-xl font-bold">৳{(report.summary?.mealRate ?? 0).toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-3">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            Monthly Settlement Details
          </CardTitle>
          <Badge variant={report.status === "finalized" ? "success" : "warning"} className="capitalize">
            {report.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 space-x-12 space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Start Date</p>
              <p className="text-sm font-bold">{formatDate(report.startDate)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">End Date</p>
              <p className="text-sm font-bold">{formatDate(report.endDate)}</p>
            </div>
            {report.finalizedAt && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Finalized At</p>
                <p className="text-sm font-bold">{formatDate(report.finalizedAt)}</p>
              </div>
            )}
            {report.finalizedBy && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Finalized By</p>
                <div className="flex items-center gap-2">
                  <UserCheck className="h-3.5 w-3.5 text-primary" />
                  <p className="text-sm font-bold truncate max-w-37.5">{report.finalizedBy}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="text-xs font-bold uppercase mb-3 flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5" />
              Calculation Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Budget Used</span>
                <span className="font-bold font-mono">৳{( (report.summary?.totalMealExpense ?? 0) + (report.summary?.totalEqualShareExpense ?? 0) ).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Per Meal Cost (Base)</span>
                <span className="font-bold font-mono">৳{(report.summary?.mealRate ?? 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Wallet, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
} from "lucide-react";
import { IReportSummary } from "@/types/report.type";

interface SummaryViewProps {
  summary: IReportSummary;
  isLoading?: boolean;
}

export function SummaryView({ summary, isLoading }: SummaryViewProps) {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-[200px] bg-accent/20 rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-[100px] bg-accent/20 rounded-xl" />
          <div className="h-[100px] bg-accent/20 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-primary">
              <Wallet className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Total Mess Cash
              </span>
            </div>
            <p className="text-3xl font-bold">৳{(summary?.totalMessCash ?? 0).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Current liquid cash available in mess fund.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Finalized Cycles
              </span>
            </div>
            <p className="text-3xl font-bold">{summary?.finalizedCycles ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Total billing cycles completed so far.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-sm font-bold flex items-center gap-3">
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            Operational Queue
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Pending Expenses</p>
                <p className="text-lg font-bold">{summary?.pendingExpenses ?? 0}</p>
              </div>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground italic">
              Expenses awaiting manager approval before being added to ledger.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-lg font-bold">{summary?.pendingPayments ?? 0}</p>
              </div>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground italic">
              Member payments submitted but not yet verified by manager.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

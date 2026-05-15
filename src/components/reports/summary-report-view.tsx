"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IReportSummary } from "@/types/report.type";
import { 
  Wallet, 
  Clock, 
  CheckCircle2,
  TrendingUp,
  Activity
} from "lucide-react";

interface SummaryReportViewProps {
  data: IReportSummary;
  role: "manager" | "member";
}

export function SummaryReportView({ data, role }: SummaryReportViewProps) {
  const isManager = role === "manager";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mess Cash Balance */}
        {isManager && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <Wallet className="h-3.5 w-3.5" /> Mess Cash Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">৳{data.totalMessCash.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground font-bold mt-2 uppercase">
                  Current available funds in mess account
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" /> Finalized Cycles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-emerald-600">{data.finalizedCycles}</span>
                <span className="text-sm font-bold text-muted-foreground uppercase">Months</span>
              </div>
              <p className="text-xs text-muted-foreground font-bold mt-2 uppercase">
                Total billing cycles completed so far
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-600 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" /> Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Expenses</p>
                <p className="text-xl font-bold text-amber-600">{data.pendingExpenses}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Payments</p>
                <p className="text-xl font-bold text-amber-600">{data.pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" /> Mess Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-bold">Operational Status</p>
                <p className="text-xs text-muted-foreground">Running smoothly this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

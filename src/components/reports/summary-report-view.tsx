"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IReportSummary } from "@/types/report.type";
import { 
  Wallet, 
  Clock, 
  CheckCircle2,
  Activity
} from "lucide-react";

interface SummaryReportViewProps {
  data: IReportSummary;
  role: "manager" | "member";
}

export function SummaryReportView({ data, role }: SummaryReportViewProps) {
  const isManager = role === "manager";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Mess Cash Balance */}
        {isManager && (
          <Card>
            <CardContent>
              <div className="p-6 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Total Mess Cash</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">৳{data.totalMessCash.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase font-medium">
                  Available mess funds
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Finalized Cycles</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-600">{data.finalizedCycles}</span>
                <span className="text-xs font-bold text-muted-foreground uppercase">Months</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-medium">
                Billing cycles completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-amber-600">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Pending Actions</span>
              </div>
              <div className="grid grid-cols-2 gap-4 divide-x divide-border mt-1">
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Expenses</p>
                  <p className="text-xl font-bold text-amber-600">{data.pendingExpenses}</p>
                </div>
                <div className="pl-4">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Payments</p>
                  <p className="text-xl font-bold text-amber-600">{data.pendingPayments}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <h4 className="text-sm font-bold uppercase tracking-wider">Mess Operational Insight</h4>
                <p className="text-xs text-muted-foreground font-medium">
                  Currently tracking <span className="text-primary font-bold">{data.pendingExpenses + data.pendingPayments}</span> pending requests. 
                  Everything else is up to date for this period.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                    System Active
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Real-time Data
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

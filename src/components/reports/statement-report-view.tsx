"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMemberStatement } from "@/types/report.type";
import { 
  Calendar, 
  History,
  Info,
  ChevronRight,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatementReportViewProps {
  data: IMemberStatement;
  role: "manager" | "member";
}

export function StatementReportView({ data }: StatementReportViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <Card className="bg-primary/5">
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 border rounded-md text-sm font-bold uppercase tracking-wider">
                <Wallet className="h-3 w-3" />
                Live Statement Balance
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold opacity-70">৳</span>
                  <span className="text-5xl md:text-6xl font-bold leading-none">
                    {data.liveCurrentBalance.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm opacity-80 max-w-100 font-medium leading-relaxed">
                  {data.liveCurrentBalance > 0 
                    ? "You have a surplus balance available for upcoming meal cycles and shared expenses." 
                    : data.liveCurrentBalance < 0
                    ? "Outstanding dues detected. Please settle the amount to avoid service interruption."
                    : "Your balance is settled. No outstanding dues or advances."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 self-start md:self-center">
              <div className="h-12 w-12 rounded-full border flex items-center justify-center text-xl font-bold">
                {data.member.user.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold leading-none">{data.member.user.fullName}</p>
                <p className="text-xs opacity-60 mt-1 uppercase font-bold tracking-widest">ID: {data.member._id.slice(-8)}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="success">
                    {data.member.status}
                  </Badge>
                  <Badge variant="info">
                    {data.member.messRole}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
            <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              Recent Transactions
            </CardTitle>
            <span className="text-xs font-bold text-muted-foreground uppercase">Last 8 Records</span>
          </CardHeader>
          <CardContent className="p-0">
            {data.ledgers.length > 0 ? (
              <div className="divide-y divide-border">
                {data.ledgers.slice(0, 8).map((ledger) => (
                  <div key={ledger._id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                        ledger.type === "credit" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                      )}>
                        {ledger.type === "credit" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-none">{ledger.description}</p>
                        <p className="text-xs text-muted-foreground mt-1 uppercase font-bold tracking-widest">{formatDate(ledger.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-bold",
                        ledger.type === "credit" ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {ledger.type === "credit" ? "+" : "-"}৳{ledger.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
                <History className="h-8 w-8 mb-4 opacity-20" />
                <p className="text-xs font-bold uppercase tracking-widest">No Transactions Found</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Billing Summaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {data.historicalFinalizations.map((item) => (
                <div key={item._id} className="space-y-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase text-primary">Finalized Statement</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase">{formatDate(item.createdAt)}</span>
                    </div>
                    <Badge variant="outline" className="text-xs uppercase font-bold">
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Meals</p>
                      <p className="text-lg font-bold">{item.summary.meals}</p>
                    </div>
                    <div className="bg-primary/5 p-3 rounded-lg text-center">
                      <p className="text-xs font-bold text-primary uppercase mb-1">Payable</p>
                      <p className="text-lg font-bold text-primary">৳{item.summary.finalPayable.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-border group cursor-pointer">
                    <span className="text-xs font-bold text-muted-foreground uppercase group-hover:text-primary">Details</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Insight Card */}
      <Card className="border-dashed">
        <CardContent>
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">Statement Transparency Notice</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use real-time synchronization for your <span className="text-foreground font-semibold">Ledger Activity</span>. 
                Values update automatically as new payments or expenses are approved. 
                Archived cycles are locked and represent historical billing records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

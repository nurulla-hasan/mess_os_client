"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMemberStatement } from "@/types/report.type";
import { 
  FileText, 
  Calendar, 
  History,
  TrendingUp,
  TrendingDown,
  Info
} from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface StatementReportViewProps {
  data: IMemberStatement;
  role: "manager" | "member";
}

export function StatementReportView({ data }: StatementReportViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Premium Balance Card */}
      <Card>
        <CardContent className="p-0">
          <div className="p-4 md:p-6">
            <div className="bg-primary shadow-xl shadow-primary/20 rounded-[32px] text-primary-foreground relative overflow-hidden">
              <div className="relative z-10 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Current Statement Balance
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl md:text-6xl font-bold tracking-tighter">৳{data.liveCurrentBalance.toLocaleString()}</span>
                    </div>
                    <p className="text-sm font-medium opacity-80 leading-relaxed max-w-xs">
                      {data.liveCurrentBalance >= 0 
                        ? "Advance balance available for next meals" 
                        : "Outstanding amount due for current transactions"}
                    </p>
                  </div>
                  <div className="flex flex-col md:text-right gap-2 self-start md:self-center bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                    <p className="text-lg font-bold uppercase tracking-tight">{data.member.user.fullName}</p>
                    <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest italic">Member ID: {data.member._id.slice(-8)}</p>
                    <div className="mt-1 flex md:justify-end">
                      <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-[10px] uppercase font-bold tracking-wider">
                        {data.member.messRole}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background Decorations */}
              <div className="absolute top-[-20%] right-[-10%] h-80 w-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-[-20%] left-[-10%] h-64 w-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Transaction History */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <History className="h-4 w-4 text-primary" /> Recent Activity Ledger
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="p-4 md:p-6 space-y-2">
              {data.ledgers.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-[32px] bg-muted/30">
                  <History className="h-10 w-10 text-muted-foreground/20 mb-3" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No Recent Transactions</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {data.ledgers.slice(0, 8).map((ledger) => (
                    <div key={ledger._id} className="flex items-center justify-between p-4 rounded-3xl border border-transparent hover:border-border hover:bg-muted/50 transition-all group">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                          ledger.type === "credit" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                        )}>
                          {ledger.type === "credit" ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold truncate group-hover:text-primary transition-colors">{ledger.description}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {formatDate(ledger.date)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-3 shrink-0">
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
              )}
            </div>
          </CardContent>
        </Card>

        {/* Billing Cycles History */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" /> Past Billing Summaries
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="p-4 md:p-6 space-y-4">
              {data.historicalFinalizations.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-[32px] bg-muted/30">
                  <FileText className="h-10 w-10 text-muted-foreground/20 mb-3" />
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">No Billing History</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {data.historicalFinalizations.map((item) => (
                    <div key={item._id} className="p-6 rounded-[32px] border bg-muted/20 hover:bg-muted/40 transition-colors relative overflow-hidden group">
                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase text-primary">Monthly Finalization</span>
                            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{formatDate(item.createdAt)}</span>
                          </div>
                          <Badge variant={item.status === "paid" ? "success" : "destructive"} className="h-6 px-4 text-[10px] font-bold uppercase tracking-widest shadow-sm rounded-full">
                            {item.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-background/80 p-4 rounded-2xl border border-primary/5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Meals</p>
                            <p className="text-base font-bold">{item.summary.meals}</p>
                          </div>
                          <div className="bg-background/80 p-4 rounded-2xl border border-primary/5">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Final Payable</p>
                            <p className="text-base font-bold text-primary">৳{item.summary.finalPayable.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <Separator className="bg-border/50" />
                        
                        <div className="flex items-center justify-between group/btn cursor-pointer">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover/btn:text-primary transition-colors">View Detailed Breakdown</span>
                          <TrendingUp className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-transform group-hover/btn:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Info */}
      <Card>
        <CardContent className="p-0">
          <div className="p-6">
            <div className="flex gap-5 items-start">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Info className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">Important Statement Policy</p>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Your current balance is calculated in real-time based on all approved transactions since the last billing finalization. 
                  Past finalizations represent fixed monthly data. For any discrepancies, please contact your mess manager.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

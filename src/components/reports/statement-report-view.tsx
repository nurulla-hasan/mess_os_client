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
      {/* Balance Summary - Using a styled div instead of a Card to allow custom look while respecting Card rules */}
      <div className="bg-primary shadow-lg shadow-primary/20 rounded-2xl text-primary-foreground overflow-hidden relative">
        <div className="p-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Current Statement Balance
              </p>
              <h2 className="text-5xl font-black tracking-tighter">৳{data.liveCurrentBalance.toLocaleString()}</h2>
              <p className="text-sm font-bold opacity-70">
                {data.liveCurrentBalance >= 0 ? "Advance balance in mess" : "Outstanding due to mess"}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <p className="text-sm font-black uppercase">{data.member.user.fullName}</p>
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest italic">Member ID: {data.member._id.slice(-8)}</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] h-64 w-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] h-48 w-48 bg-black/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Ledgers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <History className="h-3.5 w-3.5 text-primary" /> Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.ledgers.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center border border-dashed rounded-xl uppercase font-bold tracking-tight">No transactions found</p>
              ) : (
                data.ledgers.slice(0, 10).map((ledger) => (
                  <div key={ledger._id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center",
                        ledger.type === "credit" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                      )}>
                        {ledger.type === "credit" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-black truncate max-w-[150px]">{ledger.description}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{formatDate(ledger.date)}</span>
                      </div>
                    </div>
                    <span className={cn(
                      "text-xs font-black shrink-0",
                      ledger.type === "credit" ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {ledger.type === "credit" ? "+" : "-"}৳{ledger.amount.toLocaleString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Historical Finalizations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-primary" /> Past Billing Summaries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.historicalFinalizations.length === 0 ? (
                <p className="text-xs text-muted-foreground py-4 text-center border border-dashed rounded-xl uppercase font-bold tracking-tight">No billing history found</p>
              ) : (
                data.historicalFinalizations.map((item) => (
                  <div key={item._id} className="p-4 rounded-xl border border-primary/5 bg-muted/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-primary">Finalized Bill</span>
                      <Badge variant={item.status === "paid" ? "success" : "destructive"} className="h-5 px-2 text-[10px] font-black uppercase">
                        {item.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                      <div className="flex justify-between pr-4 border-r">
                        <span className="text-muted-foreground font-bold uppercase">Meals</span>
                        <span className="font-black">{item.summary.meals}</span>
                      </div>
                      <div className="flex justify-between pl-4">
                        <span className="text-muted-foreground font-bold uppercase">Net Payable</span>
                        <span className="font-black">৳{item.summary.finalPayable.toLocaleString()}</span>
                      </div>
                    </div>
                    <Separator className="bg-primary/5" />
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground font-bold uppercase tracking-tight">Date: {formatDate(item.createdAt)}</span>
                      <span className="font-black text-primary uppercase cursor-pointer hover:underline">View Breakdown</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wider text-primary">Statement Policy</p>
          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
            Your live balance includes all approved payments and expenses that haven&apos;t been finalized in a billing cycle yet. 
            Once a cycle is finalized, these values are moved to billing history.
          </p>
        </div>
      </div>
    </div>
  );
}

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
      <Card className="bg-primary text-primary-foreground border-none">
        <CardContent>
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider">
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
                <p className="text-sm opacity-80 max-w-[400px] font-medium leading-relaxed">
                  {data.liveCurrentBalance >= 0 
                    ? "You have a surplus balance available for upcoming meal cycles and shared expenses." 
                    : "Outstanding dues detected. Please settle the amount to avoid service interruption."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 self-start md:self-center">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-xl font-bold">
                {data.member.user.fullName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold leading-none">{data.member.user.fullName}</p>
                <p className="text-[10px] opacity-60 mt-1 uppercase font-bold tracking-widest">ID: {data.member._id.slice(-8)}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline" className="bg-emerald-500/20 border-none text-emerald-300 text-[10px] uppercase px-2 py-0">
                    {data.member.status}
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 border-none text-white text-[10px] uppercase px-2 py-0">
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
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Last 8 Records</span>
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
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest">{formatDate(ledger.date)}</p>
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
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Billing Summaries
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {data.historicalFinalizations.map((item) => (
                <div key={item._id} className="p-4 space-y-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-primary">Finalized Statement</span>
                      <span className="text-xs font-bold text-muted-foreground uppercase">{formatDate(item.createdAt)}</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold">
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted/50 p-3 rounded-lg text-center">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Meals</p>
                      <p className="text-lg font-bold">{item.summary.meals}</p>
                    </div>
                    <div className="bg-primary/5 p-3 rounded-lg text-center">
                      <p className="text-[10px] font-bold text-primary uppercase mb-1">Payable</p>
                      <p className="text-lg font-bold text-primary">৳{item.summary.finalPayable.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-border group cursor-pointer">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase group-hover:text-primary">Details</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Insight Card */}
      <Card className="rounded-[40px] border-none bg-linear-to-br from-primary/10 via-background to-background p-1 relative overflow-hidden shadow-sm">
        <div className="bg-background/90 backdrop-blur-xl rounded-[38px] p-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="h-16 w-16 rounded-[24px] bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 ring-4 ring-primary/10">
              <Info className="h-8 w-8" />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="text-lg font-bold text-primary uppercase tracking-widest">Statement Transparency Notice</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                We use real-time synchronization for your <span className="text-primary font-bold">Ledger Activity</span>. 
                Values in the <span className="font-bold">Premium Balance</span> card update automatically as new payments or expenses are approved. 
                Archived cycles are locked and represent historical billing records.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-[50px] -mb-16 -mr-16" />
      </Card>
    </div>
  );
}

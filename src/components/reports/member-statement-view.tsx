"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UserCircle, 
  History, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  AlertCircle
} from "lucide-react";
import { IMemberStatement } from "@/types/report.type";
import { formatDate, cn } from "@/lib/utils";

interface MemberStatementViewProps {
  statement: IMemberStatement | null;
  isLoading?: boolean;
}

export function MemberStatementView({ statement, isLoading }: MemberStatementViewProps) {
  if (isLoading) {
    return <div className="h-150 bg-accent/5 rounded-xl animate-pulse" />;
  }

  if (!statement || !("member" in statement)) {
    return (
      <Card className="border-dashed">
        <CardContent className="h-100 flex flex-col items-center justify-center text-center">
          <UserCircle className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
          <p className="font-bold">No Member Selected</p>
          <p className="text-sm text-muted-foreground">Select a member from the filters to view their statement.</p>
        </CardContent>
      </Card>
    );
  }

  const balanceType = statement.liveCurrentBalance > 0 ? "advance" : statement.liveCurrentBalance < 0 ? "due" : "settled";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-xl border">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={statement.member.user.avatar} />
            <AvatarFallback>{statement.member.user.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{statement.member.user.fullName}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs uppercase">{statement.member.messRole}</Badge>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                Joined {formatDate(statement.member.joinedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase text-muted-foreground">Live Balance</p>
          <p className={cn(
            "text-2xl font-bold",
            balanceType === "due" && "text-rose-600",
            balanceType === "advance" && "text-emerald-600",
            balanceType === "settled" && "text-muted-foreground"
          )}>
            ৳{Math.abs(statement.liveCurrentBalance).toLocaleString()}
            {balanceType !== "settled" && (
              <span className="text-xs ml-1 uppercase">{balanceType === "advance" ? "Advance" : "Due"}</span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ledger Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              Recent Ledger Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden rounded-b-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold pl-6">Date</TableHead>
                  <TableHead className="text-xs font-bold">Description</TableHead>
                  <TableHead className="text-xs font-bold text-right pr-6">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statement.ledgers.length > 0 ? (
                  statement.ledgers.map((ledger) => (
                    <TableRow key={ledger._id}>
                      <TableCell className="text-xs font-medium pl-6">{formatDate(ledger.date)}</TableCell>
                      <TableCell>
                        <p className="text-[11px] font-medium leading-tight max-w-37.5">{ledger.description}</p>
                        <span className="text-xs uppercase text-muted-foreground font-bolder">
                          {ledger.referenceType}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className={cn(
                          "text-xs font-bold flex items-center justify-end gap-1",
                          ledger.type === "credit" ? "text-emerald-600" : "text-rose-600"
                        )}>
                          {ledger.type === "credit" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          ৳{ledger.amount.toLocaleString()}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground text-xs italic">
                      No ledger entries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Historical Finalizations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <History className="h-4 w-4 text-muted-foreground" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden rounded-b-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-bold pl-6">Cycle</TableHead>
                  <TableHead className="text-xs font-bold text-center">Meals</TableHead>
                  <TableHead className="text-xs font-bold text-right pr-6">Net Payable</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statement.historicalFinalizations.length > 0 ? (
                  statement.historicalFinalizations.map((hist) => (
                    <TableRow key={hist._id}>
                      <TableCell className="text-xs font-medium italic pl-6">
                        {formatDate(hist.createdAt)}
                      </TableCell>
                      <TableCell className="text-center font-bold text-xs">{hist.summary.meals}</TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex flex-col items-end gap-1">
                          {hist.summary.finalAdvance > 0 ? (
                            <span className="font-bold text-xs text-emerald-600">Advance: ৳{hist.summary.finalAdvance.toLocaleString()}</span>
                          ) : hist.summary.finalDue > 0 ? (
                            <span className="font-bold text-xs text-rose-600">Due: ৳{hist.summary.finalDue.toLocaleString()}</span>
                          ) : (
                            <span className="font-bold text-xs text-muted-foreground">Settled</span>
                          )}
                           <Badge variant={hist.status === "paid" ? "success" : hist.status === "unpaid" ? "blocked" : "secondary"}>
                            {hist.status}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-muted-foreground text-xs italic">
                      No historical finalizations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {balanceType === "due" && (
        <div className="bg-rose-500/5 border border-rose-500/10 p-3 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400 leading-relaxed">
            This member has an outstanding due of <span className="font-bold">৳{Math.abs(statement.liveCurrentBalance).toLocaleString()}</span>. Please ensure payments are collected and verified.
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileSearch,
  Layers
} from "lucide-react";
import { 
  IExpenseReportItem,
  IExpensesReport, 
  IPaymentReportItem, 
  IPaymentsReport, 
} from "@/types/report.type";
import { formatDate, cn } from "@/lib/utils";

interface TransactionsViewProps {
  type: "expenses" | "payments";
  data: IExpensesReport | IPaymentsReport | null;
  isLoading?: boolean;
}

export function TransactionsView({ type, data, isLoading }: TransactionsViewProps) {
  if (isLoading) {
    return <div className="h-[500px] bg-accent/5 rounded-xl animate-pulse" />;
  }

  if (!data || !("data" in data) || data.data.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="h-[400px] flex flex-col items-center justify-center text-center">
          <FileSearch className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
          <p className="font-bold">No Transactions Found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your filters or selecting a different month.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-full",
              type === "expenses" 
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" 
                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}>
              {type === "expenses" ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownLeft className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total {type}</p>
              <p className="text-3xl font-bold">৳{data.summary?.totalAmount?.toLocaleString() ?? 0}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Records</p>
            <p className="text-xl font-bold">{data.summary?.totalRecords ?? 0}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-3 capitalize">
            <Layers className="h-4 w-4 text-muted-foreground" />
            Detailed {type} Log
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-hidden rounded-b-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-bold pl-6">Date</TableHead>
                <TableHead className="text-xs font-bold">{type === "expenses" ? "Category" : "Reference"}</TableHead>
                <TableHead className="text-xs font-bold">{type === "expenses" ? "Paid By" : "Member"}</TableHead>
                <TableHead className="text-xs font-bold text-right pr-6">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data.data as (IExpenseReportItem | IPaymentReportItem)[]).map((item) => {
                const isExpense = "paidBy" in item;
                const user = isExpense ? item.paidBy.user : item.messMemberId.user;
                const date = isExpense ? item.date : item.receivedDate;
                const title = isExpense ? item.category : item.reference;
                const subTitle = isExpense ? item.fundSource.replace("_", " ") : item.method;
                
                return (
                  <TableRow key={item._id}>
                    <TableCell className="text-xs font-medium pl-6">
                      {formatDate(date)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold truncate max-w-[150px]">
                          {title}
                        </span>
                        <span className="text-xs text-muted-foreground uppercase">
                          {subTitle}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6 border">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="text-xs">{user?.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{user?.fullName}</span>
                      </div>
                    </TableCell>
                    <TableCell className={cn(
                      "text-sm font-bold text-right pr-6",
                      type === "expenses" ? "text-rose-600" : "text-emerald-600"
                    )}>
                      ৳{item.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

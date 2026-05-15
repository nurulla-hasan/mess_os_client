"use client";

import { Card, CardContent } from "@/components/ui/card";
import { IExpensesReport } from "@/types/report.type";
import { 
  Wallet, 
  Tag
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { IExpenseReportItem } from "@/types/report.type";

interface ExpensesReportViewProps {
  data: IExpensesReport;
  role: "manager" | "member";
}

export function ExpensesReportView({ data }: ExpensesReportViewProps) {
  const columns: ColumnDef<IExpenseReportItem>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{formatDate(row.original.date)}</span>
      ),
    },
    {
      accessorKey: "title", 
      header: "Category & Source",
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold uppercase text-primary">{row.original.category}</span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider bg-muted w-fit px-1.5 rounded">
            {row.original.fundSource}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "paidBy",
      header: "Paid By",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
            {row.original.paidBy.user.fullName.charAt(0)}
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase">{row.original.paidBy.user.fullName}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-sm font-bold text-rose-600">৳{row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="h-5 px-3 text-[10px] font-bold uppercase tracking-widest">
          {row.original.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-0">
            <div className="p-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-rose-500/10 flex items-center justify-center shrink-0">
                <Wallet className="h-5 w-5 text-rose-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-0.5">Total Expenses</p>
                <p className="text-2xl font-bold text-rose-600">৳{data.summary.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="p-6 flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-0.5">Transaction Count</p>
                <p className="text-2xl font-bold text-primary">{data.summary.totalRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={data.data}
          />
        </CardContent>
      </Card>
    </div>
  );
}

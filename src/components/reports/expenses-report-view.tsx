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
        <span className="text-xs font-bold text-muted-foreground uppercase">{formatDate(row.original.date)}</span>
      ),
    },
    {
      accessorKey: "title", 
      header: "Category & Description",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs font-black uppercase text-primary">{row.original.category}</span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">Fund: {row.original.fundSource}</span>
        </div>
      ),
    },
    {
      accessorKey: "paidBy",
      header: "Paid By",
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground uppercase">{row.original.paidBy.user.fullName}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-sm font-black">৳{row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="success" className="h-5 px-2 text-[10px] font-black uppercase">
          {row.original.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-rose-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Expenses</p>
                <p className="text-2xl font-black text-rose-600">৳{data.summary.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Records</p>
                <p className="text-2xl font-black text-primary">{data.summary.totalRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-background rounded-2xl border border-primary/10 overflow-hidden shadow-sm">
        <DataTable columns={columns} data={data.data} />
      </div>
    </div>
  );
}

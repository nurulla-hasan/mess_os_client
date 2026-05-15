"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { IPaymentsReport, IPaymentReportItem } from "@/types/report.type";
import { 
  TrendingUp,
  Tag
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface PaymentsReportViewProps {
  data: IPaymentsReport;
  role: "manager" | "member";
}

export function PaymentsReportView({ data }: PaymentsReportViewProps) {
  const columns: ColumnDef<IPaymentReportItem>[] = [
    {
      accessorKey: "receivedDate",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground uppercase">{formatDate(row.original.receivedDate)}</span>
      ),
    },
    {
      accessorKey: "reference",
      header: "Reference",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase text-primary truncate max-w-[200px]">{row.original.reference}</span>
          <span className="text-xs text-muted-foreground font-bold uppercase">Method: {row.original.method}</span>
        </div>
      ),
    },
    {
      accessorKey: "messMemberId",
      header: "Member",
      cell: ({ row }) => (
        <span className="text-xs font-bold text-muted-foreground uppercase">{row.original.messMemberId.user.fullName}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="text-sm font-bold text-emerald-600">৳{row.original.amount.toLocaleString()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="success" className="h-5 px-2 text-xs font-bold uppercase">
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
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Payments</p>
                <p className="text-2xl font-bold text-emerald-600">৳{data.summary.totalAmount.toLocaleString()}</p>
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
                <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Records</p>
                <p className="text-2xl font-bold text-primary">{data.summary.totalRecords}</p>
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

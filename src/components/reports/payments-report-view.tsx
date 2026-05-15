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
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{formatDate(row.original.receivedDate)}</span>
      ),
    },
    {
      accessorKey: "reference",
      header: "Ref & Method",
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold uppercase text-primary tracking-tight truncate max-w-[150px]">{row.original.reference}</span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider bg-muted w-fit px-1.5 rounded">
            {row.original.method}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "messMemberId",
      header: "Member",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
            {row.original.messMemberId.user.fullName.charAt(0)}
          </div>
          <span className="text-xs font-bold text-muted-foreground uppercase">{row.original.messMemberId.user.fullName}</span>
        </div>
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
        <Badge variant="success" className="h-5 px-3 text-[10px] font-bold uppercase tracking-widest rounded-full border-none shadow-sm">
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
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-0.5">Total Collections</p>
                <p className="text-2xl font-bold text-emerald-600">৳{data.summary.totalAmount.toLocaleString()}</p>
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
                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-0.5">Payment Records</p>
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

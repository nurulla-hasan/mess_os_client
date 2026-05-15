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
        <span className="text-sm text-muted-foreground">{formatDate(row.original.receivedDate)}</span>
      ),
    },
    {
      accessorKey: "reference",
      header: "Reference",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate max-w-[150px]">{row.original.reference || "No Reference"}</span>
          <span className="text-xs text-muted-foreground capitalize">{row.original.method}</span>
        </div>
      ),
    },
    {
      accessorKey: "messMemberId",
      header: "Member",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
            {row.original.messMemberId.user.fullName.charAt(0)}
          </div>
          <span className="text-sm">{row.original.messMemberId.user.fullName}</span>
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
        <Badge variant="success" className="capitalize font-medium">
          {row.original.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground font-medium">Total Collections</p>
                <p className="text-2xl font-bold text-emerald-600">৳{data.summary.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Tag className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-muted-foreground font-medium">Payment Records</p>
                <p className="text-2xl font-bold text-primary">{data.summary.totalRecords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={data.data}
          />
        </CardContent>
      </Card>
    </div>
  );
}

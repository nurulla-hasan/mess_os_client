"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { ISubscriptionLog } from "@/types/subscription.type";

export const subscriptionHistoryColumns: ColumnDef<ISubscriptionLog>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => <span className="text-xs font-medium">{formatDate(row.original.createdAt)}</span>,
  },
  {
    accessorKey: "planId",
    header: "Plan",
    cell: ({ row }) => <Badge variant="outline" className="uppercase text-xs">{row.original.planId}</Badge>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <Badge 
        variant={
          row.original.action === "subscribed" ? "success" : 
          row.original.action === "payment_failed" ? "rejected" : 
          "secondary"
        }
        className="capitalize text-xs"
      >
        {row.original.action.replace(/_/g, " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-xs font-bold">
        {row.original.amount > 0 ? `৳${row.original.amount.toLocaleString()}` : "Free"}
      </span>
    ),
  },
  {
    accessorKey: "note",
    header: "Reference",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground italic truncate max-w-[200px] block" title={row.original.note}>
        {row.original.note || "N/A"}
      </span>
    ),
  },
];

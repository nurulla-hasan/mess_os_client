"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { IUtilityBill, UtilityCategory } from "@/types/utility.type";
import { format } from "date-fns";
import { 
  Zap, 
  Droplets, 
  Flame, 
  Globe, 
  Trash2, 
  MoreHorizontal,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UtilityActions } from "./utility-actions";

const categoryIcons: Record<UtilityCategory, LucideIcon> = {
  electricity: Zap,
  water: Droplets,
  gas: Flame,
  internet: Globe,
  trash: Trash2,
  others: MoreHorizontal,
};

const categoryColors: Record<UtilityCategory, string> = {
  electricity: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  water: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  gas: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  internet: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  trash: "text-slate-500 bg-slate-500/10 border-slate-500/20",
  others: "text-muted-foreground bg-muted border-muted-foreground/20",
};

export const columns: ColumnDef<IUtilityBill>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const { category, billingMonth, year } = row.original;
      const Icon = categoryIcons[category] || MoreHorizontal;
      return (
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg border", categoryColors[category])}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-foreground text-sm capitalize">
              {category} Bill
            </span>
            <span className="text-xs text-muted-foreground uppercase font-medium">
              {format(new Date(year, billingMonth - 1), "MMMM yyyy")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground text-sm">৳{row.original.amount.toLocaleString()}</span>
        <span className="text-xs text-muted-foreground uppercase font-medium tracking-tight">
          Utility Charge
        </span>
      </div>
    ),
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {format(new Date(row.original.dueDate), "dd MMM, yyyy")}
        </span>
        <span className={cn(
          "text-xs uppercase font-bold",
          new Date(row.original.dueDate) < new Date() && row.original.status === "unpaid" 
            ? "text-rose-500" 
            : "text-muted-foreground"
        )}>
          Payment Deadline
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant={status === "paid" ? "success" : "pending"}
          className="uppercase text-xs font-bold px-1.5 h-5"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end pr-2">Actions</div>,
    cell: ({ row }) => {
      const bill = row.original;
      return <UtilityActions bill={bill} messId={bill.messId} />;
    },
  },
];

"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { IMemberBill } from "@/types/billing.type";

export const columns: ColumnDef<IMemberBill>[] = [
  {
    accessorKey: "messMemberId",
    header: "Member",
    cell: ({ row }) => {
      const user = row.original.messMemberId.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-primary/10">
            <AvatarImage src={user?.avatar} alt={user?.fullName} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold uppercase">
              {getInitials(user?.fullName || "Unknown")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-foreground text-sm truncate max-w-[150px]">
              {user?.fullName || "Member"}
            </span>
            <span className="text-xs text-muted-foreground uppercase font-medium">
              {row.original.messMemberId.messRole}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "summary.meals",
    header: "Meals",
    cell: ({ row }) => <span className="font-medium">{row.original.summary.meals}</span>,
  },
  {
    accessorKey: "summary.mealCharge",
    header: "Meal Charge",
    cell: ({ row }) => <span className="font-medium text-muted-foreground">৳{row.original.summary.mealCharge}</span>,
  },
  {
    accessorKey: "summary.equalShare",
    header: "Equal Share",
    cell: ({ row }) => <span className="font-medium text-muted-foreground">৳{row.original.summary.equalShare}</span>,
  },
  {
    accessorKey: "summary.totalPaymentsAndCredits",
    header: "Paid/Credit",
    cell: ({ row }) => <span className="font-bold text-emerald-600">৳{row.original.summary.totalPaymentsAndCredits}</span>,
  },
  {
    accessorKey: "summary.finalDue",
    header: "Net Payable",
    cell: ({ row }) => {
      const { finalDue, finalAdvance } = row.original.summary;
      if (finalAdvance > 0) {
        return <span className="font-bold text-emerald-600">Advance: ৳{finalAdvance}</span>;
      }
      if (finalDue > 0) {
        return <span className="font-bold text-rose-600">Due: ৳{finalDue}</span>;
      }
      return <span className="font-bold text-muted-foreground">Settled</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant={status === "paid" ? "success" : status === "partially_paid" ? "warning" : "pending"}
        >
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
];

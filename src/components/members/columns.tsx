"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IMember } from "@/types/member.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { ActionButtons } from "./action-buttons";

export const columns: ColumnDef<IMember>[] = [
  {
    accessorKey: "user.fullName",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border border-primary/10">
          <AvatarImage src={row.original.user.avatar} alt={row.original.user.fullName} />
          <AvatarFallback className="bg-primary/5 text-primary text-xs font-medium">
            {row.original.user.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm text-foreground truncate">{row.original.user.fullName}</span>
          <span className="text-xs text-muted-foreground truncate">{row.original.user.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "messRole",
    header: "Role",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge variant={row.original.messRole === "manager" ? "manager" : "member"} className="font-medium">
          {row.original.messRole}
        </Badge>
        {row.original.messRole === "manager" && (
          <Badge variant={row.original.isResidentManager !== false ? "active" : "muted"} >
            {row.original.isResidentManager !== false ? "Resident" : "External"}
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "active" : status === "pending" ? "pending" : "rejected"} className="font-medium">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "user.phone",
    header: "Phone",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.user.phone}</span>,
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const balance = row.original.balance;
      if (!balance || balance.type === "settled") {
        return <span className="text-xs text-muted-foreground">—</span>;
      }
      return (
        <span className={cn(
          "text-sm font-bold",
          balance.type === "advance" ? "text-emerald-600" : "text-rose-600"
        )}>
          ৳{balance.amount.toLocaleString()}
          <span className="text-[10px] ml-1 uppercase">{balance.type}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined/Requested",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons member={row.original} />,
  },
];

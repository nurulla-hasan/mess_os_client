"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IMeal } from "@/types/meal.type";

export const columns: ColumnDef<IMeal>[] = [
  {
    accessorKey: "messMemberId.userId.fullName",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black h-8 w-8 shrink-0">
          {row.original.messMemberId.userId.fullName.charAt(0)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-sm truncate">{row.original.messMemberId.userId.fullName}</span>
          <span className="text-[10px] text-muted-foreground truncate uppercase">{row.original.messMemberId.userId.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground/80">
        {format(new Date(row.original.date), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "mealCount",
    header: "Count",
    cell: ({ row }) => (
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-black text-sm border border-primary/20">
        {row.original.mealCount}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Logged At",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground font-medium uppercase">
        {format(new Date(row.original.updatedAt), "hh:mm a")}
      </span>
    ),
  },
];

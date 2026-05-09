"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IMeal } from "@/types/meal.type";

export const columns: ColumnDef<IMeal>[] = [
  {
    accessorKey: "messMemberId.userId.fullName",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-primary/5 flex items-center justify-center text-primary text-xs font-medium h-8 w-8 shrink-0 border border-primary/10">
          {row.original.messMemberId.userId.fullName.charAt(0)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-foreground truncate">{row.original.messMemberId.userId.fullName}</span>
          <span className="text-xs text-muted-foreground truncate">{row.original.messMemberId.userId.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.date), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "mealCount",
    header: "Count",
    cell: ({ row }) => (
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted/50 text-foreground text-sm font-medium border border-muted">
        {row.original.mealCount}
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Logged At",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground font-normal">
        {format(new Date(row.original.updatedAt), "hh:mm a")}
      </span>
    ),
  },
];

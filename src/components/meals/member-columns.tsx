"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { MealRecord } from "./columns";

export const memberMealColumns: ColumnDef<MealRecord>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{format(new Date(row.original.date), "EEEE")}</span>
        <span className="text-xs text-muted-foreground uppercase">{format(new Date(row.original.date), "MMM dd, yyyy")}</span>
      </div>
    ),
  },
  {
    accessorKey: "count",
    header: "Meal Count",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Badge variant="info" className="px-3 py-1 font-black text-xs">
          {row.original.count}
        </Badge>
        <span className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Meals</span>
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Logged At",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground italic">
        {format(new Date(row.original.updatedAt), "MMM dd, hh:mm a")}
      </span>
    ),
  },
];

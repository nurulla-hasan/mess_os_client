"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type MealRecord = {
  id: string;
  member: {
    name: string;
    email: string;
  };
  date: string;
  count: number;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<MealRecord>[] = [
  {
    accessorKey: "member",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.original.member.name}</span>
        <span className="text-xs text-muted-foreground uppercase">{row.original.member.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {format(new Date(row.original.date), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "count",
    header: "Meal Count",
    cell: ({ row }) => (
      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">
        {row.original.count}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Last Logged",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground uppercase font-medium">
        {format(new Date(row.original.updatedAt), "hh:mm a")}
      </span>
    ),
  },
];

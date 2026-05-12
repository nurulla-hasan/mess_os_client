"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IMeal } from "@/types/meal.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<IMeal>[] = [
  {
    accessorKey: "messMemberId.userId.fullName",
    header: "Member",
    cell: ({ row }) => {
      const user = row.original.messMemberId.userId;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-primary/10">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-medium">
              {user.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{user.fullName}</span>
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>
        </div>
      );
    },
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
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-foreground text-sm font-medium border border-muted">
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

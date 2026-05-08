"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IUser } from "@/types/user.type";
import { ActionButtons } from "./user-actions";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "fullName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
          {row.original.fullName.charAt(0)}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span >{row.original.fullName}</span>
          <span className="text-sm text-muted-foreground truncate">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "globalRole",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.globalRole;
      return (
        <Badge 
          variant={role === "super_admin" ? "manager" : role === "manager" ? "info" : "secondary"} 
          className="capitalize text-xs py-0.5 px-2"
        >
          {role.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant={status === "active" ? "success" : "rejected"}
          className="capitalize text-xs py-0.5 px-2"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons user={row.original} />,
  },
];

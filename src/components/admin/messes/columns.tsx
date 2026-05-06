"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShieldAlert, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type AdminMess = {
  id: string;
  name: string;
  address: string;
  status: "active" | "suspended" | "pending";
  createdAt: string;
  memberCount: number;
  manager: {
    name: string;
    email: string;
  };
};

export const columns: ColumnDef<AdminMess>[] = [
  {
    accessorKey: "name",
    header: "Mess",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{row.original.name}</span>
        <span className="text-[10px] text-muted-foreground uppercase truncate max-w-48">{row.original.address}</span>
      </div>
    ),
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{row.original.manager.name}</span>
        <span className="text-[10px] text-muted-foreground uppercase">{row.original.manager.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "memberCount",
    header: "Members",
    cell: ({ row }) => (
      <Badge variant="secondary" className="px-2 py-0.5 h-5 text-[10px]">
        {row.original.memberCount} Members
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "success" : status === "suspended" ? "rejected" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const mess = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mess Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {mess.status === "active" ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-rose-600">
                    <ShieldAlert className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Suspend Mess</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Activate Mess</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];

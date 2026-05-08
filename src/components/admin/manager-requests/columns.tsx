"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type ManagerRequest = {
  _id: string;
  userId: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    status: string;
    globalRole: string;
  };
  status: "pending" | "approved" | "rejected";
  reason: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<ManagerRequest>[] = [
  {
    accessorKey: "userId.fullName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{row.original.userId.fullName}</span>
        <span className="text-xs text-muted-foreground uppercase">{row.original.userId.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "userId.phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.original.userId.phone}</span>
    ),
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="text-sm line-clamp-2 italic text-muted-foreground">
          &quot;{row.original.reason}&quot;
        </p>
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
          variant={
            status === "approved" 
              ? "success" 
              : status === "rejected" 
                ? "rejected" 
                : "pending"
          }
          className="uppercase text-[10px]"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Requested On",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Review</div>,
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {request.status === "pending" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Approve Request</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reject Request</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      );
    },
  },
];

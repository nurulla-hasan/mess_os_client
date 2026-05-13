"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { IPayment } from "@/types/payment.type";
import { IUser } from "@/types/user.type";

export const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "messMemberId",
    header: "Member",
    cell: ({ row }) => {
      const member = row.original.messMemberId;
      const isExpanded = typeof member === "object" && member !== null;

      return (
        <div className="flex flex-col">
          <span className="font-bold text-foreground">
            {isExpanded ? (member as IUser).fullName : "Member"}
          </span>
          <span className="text-xs text-muted-foreground">
            {isExpanded ? (member as IUser).email : (member as string)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="font-bold text-primary">৳{row.original.amount}</span>,
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <Badge variant="secondary" className="uppercase font-mono text-xs">
        {row.original.method}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variantMap: Record<string, "success" | "rejected" | "pending" | "secondary"> = {
        approved: "success",
        rejected: "rejected",
        pending: "pending",
        canceled: "secondary",
      };

      return (
        <Badge variant={variantMap[status] || "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-1 max-w-[150px]">
        {row.original.reference || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, hh:mm a")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon-sm" 
                  onClick={() => console.log("View Payment", payment)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {payment.status === "pending" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon-sm" 
                      className="text-emerald-600"
                      onClick={() => console.log("Approve Payment", payment)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Approve Payment</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon-sm" 
                      className="text-rose-600"
                      onClick={() => console.log("Reject Payment", payment)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reject Payment</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      );
    },
  },
];

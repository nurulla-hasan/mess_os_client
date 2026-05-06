"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Settings2, History } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type AdminSubscription = {
  id: string;
  messName: string;
  plan: "Starter" | "Standard" | "Premium";
  status: "active" | "expired" | "canceled" | "trial";
  nextRenewal: string;
  totalRevenue: number;
};

export const columns: ColumnDef<AdminSubscription>[] = [
  {
    accessorKey: "messName",
    header: "Mess",
    cell: ({ row }) => (
      <span className="text-sm font-bold">{row.original.messName}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Current Plan",
    cell: ({ row }) => (
      <Badge variant={row.original.plan === "Premium" ? "manager" : row.original.plan === "Standard" ? "info" : "secondary"}>
        {row.original.plan}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "success" : status === "trial" ? "info" : "rejected"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "nextRenewal",
    header: "Next Renewal",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.nextRenewal), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "totalRevenue",
    header: "Total Revenue",
    cell: ({ row }) => (
      <span className="text-sm font-black">৳{row.original.totalRevenue}</span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: () => {
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary">
                  <History className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Billing History</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-amber-600">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Adjust Subscription</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

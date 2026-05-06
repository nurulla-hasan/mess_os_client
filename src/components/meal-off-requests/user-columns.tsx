"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { MealOffRequest } from "@/components/meals/off-requests-columns";

export const userMealOffColumns: ColumnDef<MealOffRequest>[] = [
  {
    accessorKey: "dateRange",
    header: "Dates",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {format(new Date(row.original.startDate), "MMM dd")} - {format(new Date(row.original.endDate), "MMM dd")}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase">
          {format(new Date(row.original.startDate), "yyyy")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "approved" ? "success" : status === "rejected" ? "rejected" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <span className="text-sm truncate max-w-48 block text-muted-foreground italic">
        &quot;{row.original.reason}&quot;
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {request.status === "pending" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-rose-600">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cancel Request</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];

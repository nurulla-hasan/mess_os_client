"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, UserPlus, Ban } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type MarketSchedule = {
  id: string;
  targetDate: string;
  assignedMembers: { name: string }[];
  itemCount: number;
  estimatedBudget: number;
  actualSpent?: number;
  status: "pending" | "completed" | "voided";
};

export const columns: ColumnDef<MarketSchedule>[] = [
  {
    accessorKey: "targetDate",
    header: "Target Date",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {format(new Date(row.original.targetDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "assignedMembers",
    header: "Assignees",
    cell: ({ row }) => (
      <div className="flex -space-x-2">
        {row.original.assignedMembers.map((m, i) => (
          <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-accent flex items-center justify-center text-xs font-bold">
            {m.name.charAt(0)}
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">৳{row.original.estimatedBudget}</span>
        {row.original.actualSpent && (
          <span className="text-xs text-muted-foreground uppercase">Spent: ৳{row.original.actualSpent}</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "completed" ? "success" : status === "voided" ? "rejected" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const schedule = row.original;

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

          {schedule.status === "pending" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-blue-600">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reassign Duty</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-emerald-600">
                      <Check className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Complete Duty</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-rose-600">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Void Schedule</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      );
    },
  },
];

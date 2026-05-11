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
import { IMarketSchedule } from "@/types/market-schedule.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<IMarketSchedule>[] = [
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
    accessorKey: "assignedTo",
    header: "Assignees",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {row.original.assignedTo.map((member) => (
            <Avatar key={member._id} className="h-7 w-7 border-2 border-background ring-offset-background">
              <AvatarImage src={member.user.avatarUrl} alt={member.user.fullName} />
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                {member.user.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-xs font-medium text-muted-foreground truncate max-w-37.5">
          {row.original.assignedTo.map(m => m.user.fullName).join(", ")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "shoppingItems",
    header: "Items",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-[10px]">
        {row.original.shoppingItems.length} Items
      </Badge>
    ),
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">৳{row.original.estimatedBudget}</span>
        {row.original.actualCost !== undefined && (
          <span className="text-xs text-muted-foreground uppercase">Spent: ৳{row.original.actualCost}</span>
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
        <Badge variant={status === "completed" ? "success" : status === "void" ? "rejected" : "pending"}>
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

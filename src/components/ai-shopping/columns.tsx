"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Check, X, ShoppingCart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type AiShoppingList = {
  id: string;
  menuPlanDate: string;
  targetMarketDate: string;
  itemCount: number;
  status: "draft" | "approved" | "rejected" | "converted";
  estimatedBudget: number;
};

export const columns: ColumnDef<AiShoppingList>[] = [
  {
    accessorKey: "menuPlanDate",
    header: "Menu Plan",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {format(new Date(row.original.menuPlanDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "targetMarketDate",
    header: "Market Date",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {format(new Date(row.original.targetMarketDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => (
      <Badge variant="secondary" className="px-2 py-0.5 h-5 text-xs">
        {row.original.itemCount} Items
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "converted" ? "success" : status === "rejected" ? "rejected" : status === "approved" ? "info" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const list = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View List</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {list.status === "draft" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-emerald-600">
                      <Check className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Approve List</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-rose-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reject List</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}

          {list.status === "approved" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary font-bold">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Convert to Market Schedule</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Sparkles, Send, Archive } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { IMenuPlan } from "@/types/menu-plan.type";

export const columns: ColumnDef<IMenuPlan>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {format(new Date(row.original.date), "EEEE")}
        </span>
        <span className="text-xs text-muted-foreground uppercase">
          {format(new Date(row.original.date), "MMM dd, yyyy")}
        </span>
      </div>
    ),
  },
  {
    id: "menu",
    header: "Menu Summary",
    cell: ({ row }) => {
      const meals = row.original.meals;
      // Convert meals object to array of [category, content]
      const mealEntries = Object.entries(meals);

      return (
        <div className="flex flex-col gap-0.5 max-w-50">
          {mealEntries.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">No items set</span>
          ) : (
            mealEntries.slice(0, 3).map(([category, content]) => (
              <div key={category} className="flex items-center gap-2">
                <span className="text-[10px] font-black text-primary/60 w-3 uppercase">
                  {category.charAt(0)}
                </span>
                <span className="text-xs truncate font-medium max-w-37.5">
                  {content || "---"}
                </span>
              </div>
            ))
          )}
          {mealEntries.length > 3 && (
            <span className="text-[9px] text-muted-foreground ml-5">
              + {mealEntries.length - 3} more
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isAiGenerated",
    header: "Source",
    cell: ({ row }) => (
      row.original.isAiGenerated ? (
        <Badge variant="info" className="gap-1 px-2 py-0.5 h-5 text-[9px]">
          <Sparkles className="h-2 w-2" /> AI Gen
        </Badge>
      ) : (
        <Badge variant="secondary" className="px-2 py-0.5 h-5 text-[9px]">Manual</Badge>
      )
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant={status === "published" ? "active" : status === "archived" ? "blocked" : "pending"}
          className="h-5 text-[9px] px-2"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const plan = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {plan.status === "draft" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Plan</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600">
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Publish Plan</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}

          {plan.status === "published" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600">
                    <Archive className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Archive Plan</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];

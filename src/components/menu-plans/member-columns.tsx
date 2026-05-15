"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { IMenuPlan } from "@/types/menu-plan.type";
import { ViewMenuPlanModal } from "./view-menu-plan-modal";
import { formatDate } from "@/lib/utils";

export const memberMenuPlanColumns: ColumnDef<IMenuPlan>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-bold">{formatDate(date)}</span>
          <span className="text-xs text-muted-foreground uppercase">
            Scheduled
          </span>
        </div>
      );
    },
  },
  {
    id: "menu",
    header: "Menu Summary",
    cell: ({ row }) => {
      const meals = row.original.meals;
      const mealEntries = Object.entries(meals);

      return (
        <div className="flex flex-col gap-0.5 max-w-50">
          {mealEntries.length === 0 ? (
            <span className="text-xs text-muted-foreground italic">
              No items set
            </span>
          ) : (
            mealEntries.slice(0, 3).map(([category, content]) => (
              <div key={category} className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary/60 w-3 uppercase">
                  {category.charAt(0)}
                </span>
                <span className="text-xs truncate font-medium max-w-37.5">
                  {content || "---"}
                </span>
              </div>
            ))
          )}
          {mealEntries.length > 3 && (
            <span className="text-xs text-muted-foreground ml-5">
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
    cell: ({ row }) =>
      row.original.isAiGenerated ? (
        <Badge variant="info" className="gap-1 px-2 py-0.5 h-5 text-xs">
          <Sparkles className="h-2 w-2" /> AI Gen
        </Badge>
      ) : (
        <Badge variant="secondary" className="px-2 py-0.5 h-5 text-xs">
          Manual
        </Badge>
      ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <ViewMenuPlanModal plan={row.original} />
      </div>
    ),
  },
];

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

export type MenuPlan = {
  id: string;
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  isAiGenerated: boolean;
  status: "draft" | "published" | "archived";
};

export const columns: ColumnDef<MenuPlan>[] = [
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
    accessorKey: "menu",
    header: "Menu (B / L / D)",
    cell: ({ row }) => (
      <div className="flex flex-col gap-0.5 max-w-50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground w-3">B</span>
          <span className="text-xs truncate">{row.original.breakfast}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground w-3">L</span>
          <span className="text-xs truncate font-medium">{row.original.lunch}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground w-3">D</span>
          <span className="text-xs truncate font-medium">{row.original.dinner}</span>
        </div>
      </div>
    ),
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
        <Badge variant={status === "published" ? "success" : status === "archived" ? "blocked" : "pending"}>
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
                <Button variant="ghost" size="icon">
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
                    <Button variant="ghost" size="icon" className="text-amber-600">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit Plan</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-emerald-600">
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
                  <Button variant="ghost" size="icon" className="text-rose-600">
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

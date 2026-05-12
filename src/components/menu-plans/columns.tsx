"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Archive } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IMenuPlan } from "@/types/menu-plan.type";
import { ViewMenuPlanModal } from "./view-menu-plan-modal";
import { EditMenuPlanModal } from "./edit-menu-plan-modal";
import { formatDate, SuccessToast, ErrorToast } from "@/lib/utils";
import { updateMenuPlanStatus } from "@/services/menu-plan.service";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

interface ActionButtonsProps {
  plan: IMenuPlan;
}

function ActionButtons({ plan }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<
    "published" | "archived" | null
  >(null);

  const handleStatusUpdate = async () => {
    if (!actionType) return;
    setIsLoading(true);
    try {
      const res = await updateMenuPlanStatus(plan.messId, plan._id, actionType);
      if (res.success) {
        SuccessToast(res.message || `Plan ${actionType} successfully!`);
        setIsConfirmOpen(false);
      } else {
        ErrorToast(res.message || "Failed to update status.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (type: "published" | "archived") => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewMenuPlanModal plan={plan} />

      {plan.status === "draft" && (
        <>
          <EditMenuPlanModal plan={plan} />
          <Button
            variant="outline"
            size="icon-sm"
            className="text-emerald-600 dark:text-emerald-500"
            onClick={() => openModal("published")}
          >
            <Send />
          </Button>
        </>
      )}

      {plan.status === "published" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="text-rose-600 dark:text-rose-500"
                onClick={() => openModal("archived")}
              >
                <Archive />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive Plan</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {actionType && (
        <ConfirmationModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          trigger={null}
          title={
            actionType === "published"
              ? "Publish Menu Plan"
              : "Archive Menu Plan"
          }
          description={
            actionType === "published"
              ? "Are you sure you want to publish this menu plan? It will be visible to all members."
              : "Are you sure you want to archive this menu plan? It will no longer be visible as active."
          }
          confirmText={actionType === "published" ? "Publish" : "Archive"}
          variant={actionType === "published" ? "default" : "destructive"}
          isLoading={isLoading}
          onConfirm={handleStatusUpdate}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<IMenuPlan>[] = [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "published"
              ? "active"
              : status === "archived"
                ? "blocked"
                : "pending"
          }
          className="h-5 text-xs px-2"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons plan={row.original} />,
  },
];

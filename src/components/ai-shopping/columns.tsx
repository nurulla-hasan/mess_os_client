"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { updateAiShoppingListStatus } from "@/services/ai-shopping.service";
import { IAiShoppingList } from "@/types/ai-shopping.type";
import { ViewAiShoppingListModal } from "./view-ai-shopping-list-modal";
import { ConvertAiShoppingListModal } from "./convert-ai-shopping-list-modal";

interface ActionButtonsProps {
  list: IAiShoppingList;
}

function ActionButtons({ list }: ActionButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isManagerRoute = pathname.startsWith("/manager");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<"approved" | "rejected" | null>(null);

  const handleStatusUpdate = async () => {
    if (!actionType) return;
    setIsLoading(true);
    try {
      const res = await updateAiShoppingListStatus(list.messId, list._id, actionType);
      if (res.success) {
        SuccessToast(res.message || `List ${actionType}.`);
        setIsConfirmOpen(false);
        router.refresh();
      } else {
        ErrorToast(res.message || "Failed to update list.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (type: "approved" | "rejected") => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewAiShoppingListModal list={list} />

      {isManagerRoute && list.status === "draft" && (
        <>
          <Button variant="outline" size="icon-sm" className="text-emerald-600" onClick={() => openModal("approved")}>
            <Check />
          </Button>
          <Button variant="outline" size="icon-sm" className="text-rose-600" onClick={() => openModal("rejected")}>
            <X />
          </Button>
        </>
      )}

      {isManagerRoute && list.status === "approved" && <ConvertAiShoppingListModal list={list} />}

      {list.status === "converted" && list.marketScheduleId && (
        <Badge variant="secondary" className="gap-1 h-8 px-2">
          <ShoppingCart className="h-3 w-3" /> Scheduled
        </Badge>
      )}

      {actionType && (
        <ConfirmationModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          trigger={null}
          title={actionType === "approved" ? "Approve Shopping List" : "Reject Shopping List"}
          description={
            actionType === "approved"
              ? "Approve this AI shopping list so it can be converted to a market schedule?"
              : "Reject this AI shopping draft? It cannot be converted after rejection."
          }
          confirmText={actionType === "approved" ? "Approve" : "Reject"}
          variant={actionType === "approved" ? "default" : "destructive"}
          isLoading={isLoading}
          onConfirm={handleStatusUpdate}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<IAiShoppingList>[] = [
  {
    accessorKey: "targetDate",
    header: "Market Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{format(new Date(row.original.targetDate), "MMM dd, yyyy")}</span>
        <span className="text-xs text-muted-foreground uppercase">Target</span>
      </div>
    ),
  },
  {
    accessorKey: "menuPlanId",
    header: "Menu Plan",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">{row.original.menuPlanId.slice(-8)}</span>
    ),
  },
  {
    id: "items",
    header: "Items",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <Badge variant="secondary" className="w-fit px-2 py-0.5 h-5 text-xs">
          {row.original.items.length} Items
        </Badge>
        <span className="text-xs text-muted-foreground truncate max-w-56">
          {row.original.items.slice(0, 3).map((item) => item.name).join(", ")}
          {row.original.items.length > 3 ? "..." : ""}
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
        <Badge variant={status === "converted" ? "success" : status === "rejected" ? "rejected" : status === "approved" ? "info" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons list={row.original} />,
  },
];
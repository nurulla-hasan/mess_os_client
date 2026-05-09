"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Trash2 } from "lucide-react";
import { PlanModal } from "./plan-modal";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { deleteSubscriptionPlan } from "@/services/admin.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { ISubscriptionPlan } from "@/types/subscription.type";

const PlanActions = ({ plan }: { plan: ISubscriptionPlan }) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteSubscriptionPlan(plan._id);
      if (response?.success) {
        SuccessToast(response.message || "Plan deleted successfully!");
      } else {
        ErrorToast(response?.message || "Failed to delete plan.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <PlanModal plan={plan} />
      <ConfirmationModal
        title="Delete Plan?"
        description={`Are you sure you want to delete the "${plan.name}" plan? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        trigger={
          <Button variant="ghost" size="icon" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />
    </div>
  );
};

export const columns: ColumnDef<ISubscriptionPlan>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
    cell: ({ row }) => {
      const isDefault = row.original.isDefault;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm">{row.original.name}</span>
          {isDefault && (
            <Badge variant="outline" className="text-xs h-4 px-1.5 bg-primary/10 text-primary border-primary/20 font-normal">
              <Star className="h-2 w-2 mr-1 fill-primary" /> Default
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <span className="text-xs bg-accent px-1.5 py-0.5 rounded">{row.original.code}</span>,
  },
  {
    accessorKey: "price",
    header: "Pricing",
    cell: ({ row }) => {
      const price = row.original.price;
      const currency = row.original.currency;
      return (
        <div className="flex flex-col">
          <span className="text-sm">{price === 0 ? "Free" : `${price} ${currency}`}</span>
          <span className="text-xs text-muted-foreground">{row.original.billingCycle}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "maxMembers",
    header: "Max Members",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Users className="h-3 w-3 text-muted-foreground" />
        <span className="text-sm">{row.original.maxMembers}</span>
      </div>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.original.features;
      const activeCount = Object.values(features).filter(Boolean).length;
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {activeCount} Enabled
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "success" : "destructive"} className="font-normal">
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <PlanActions plan={row.original} />,
  },
];

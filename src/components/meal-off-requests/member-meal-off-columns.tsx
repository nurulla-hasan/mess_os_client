"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { format } from "date-fns";
import { IMealOffRequest } from "@/types/meal-off-request.type";
import { cancelMealOffRequest } from "@/services/meal-off-request.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { ViewOffRequestModal } from "@/components/meals/view-off-request-modal";

const RequestActions = ({ request }: { request: IMealOffRequest }) => {
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  const handleCancel = () => {
    startTransition(async () => {
      const res = await cancelMealOffRequest(request.messId, request._id);
      if (res.success) {
        SuccessToast(res.message || "Request cancelled successfully.");
        setOpen(false);
      } else {
        ErrorToast(res.message || "Failed to cancel request.");
      }
    });
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewOffRequestModal request={request} />

      {request.status === "pending" && (
        <ConfirmationModal
          title="Cancel Request?"
          description="Are you sure you want to cancel this meal off request? This action cannot be undone."
          confirmText="Yes, Cancel"
          loadingText="Cancelling..."
          variant="destructive"
          open={open}
          onOpenChange={setOpen}
          onConfirm={handleCancel}
          isLoading={isPending}
          trigger={
            <Button 
              variant="outline" 
              size="icon-sm" 
              className="text-rose-600 hover:text-rose-700"
            >
              <XCircle className="h-4 w-4" />
            </Button>
          }
        />
      )}
    </div>
  );
};

export const memberMealOffColumns: ColumnDef<IMealOffRequest>[] = [
  {
    accessorKey: "dateRange",
    header: "Dates",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold">
          {format(new Date(row.original.startDate), "MMM dd")} - {format(new Date(row.original.endDate), "MMM dd")}
        </span>
        <span className="text-xs text-muted-foreground uppercase">
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
    cell: ({ row }) => <RequestActions request={row.original} />,
  },
];

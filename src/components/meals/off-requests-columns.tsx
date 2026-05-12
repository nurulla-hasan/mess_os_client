"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Calendar as CalendarIcon, Ban } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { IMealOffRequest, MealOffRequestStatus } from "@/types/meal-off-request.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { updateMealOffRequestStatus } from "@/services/meal-off-request.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ViewOffRequestModal } from "./view-off-request-modal";

interface ActionButtonsProps {
  request: IMealOffRequest;
}

function ActionButtons({ request }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<MealOffRequestStatus | null>(null);

  const handleAction = async () => {
    if (!actionType) return;
    setIsLoading(true);
    try {
      const res = await updateMealOffRequestStatus(request.messId, request._id, {
        status: actionType,
      });

      if (res?.success) {
        SuccessToast(res.message || "Request updated successfully.");
        setIsConfirmOpen(false);
      } else {
        ErrorToast(res?.message || "Failed to update request.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (type: MealOffRequestStatus) => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  const getModalInfo = () => {
    switch (actionType) {
      case "approved":
        return { title: "Approve Request", confirm: "Approve", variant: "default" as const };
      case "rejected":
        return { title: "Reject Request", confirm: "Reject", variant: "destructive" as const };
      case "canceled":
        return { title: "Cancel Request", confirm: "Cancel Request", variant: "destructive" as const };
      default:
        return { title: "Update Status", confirm: "Confirm", variant: "default" as const };
    }
  };

  const { title, confirm, variant } = getModalInfo();

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewOffRequestModal request={request} />

      {request.status === "pending" && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            onClick={() => openModal("approved")}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            onClick={() => openModal("rejected")}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}

      {request.status === "approved" && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
          onClick={() => openModal("canceled")}
          title="Cancel Approved Request"
        >
          <Ban className="h-4 w-4" />
        </Button>
      )}

      {actionType && (
        <ConfirmationModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          trigger={null}
          title={title}
          description={`Are you sure you want to ${actionType} the meal off request for ${request.messMemberId.user.fullName}?`}
          confirmText={confirm}
          variant={variant}
          isLoading={isLoading}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<IMealOffRequest>[] = [
  {
    accessorKey: "messMemberId.user.fullName",
    header: "Member",
    cell: ({ row }) => {
      const user = row.original.messMemberId.user;
      
      if (!user) return <span className="text-xs text-muted-foreground">Unknown Member</span>;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="border border-primary/10">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback className="bg-primary/5 text-primary text-xs font-medium">
              {user.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate">{user.fullName}</span>
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dates",
    header: "Duration",
    cell: ({ row }) => {
      const start = new Date(row.original.startDate);
      const end = new Date(row.original.endDate);
      const days = differenceInDays(end, start) + 1;
      
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-sm font-medium">
            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
            <span>{format(start, "MMM dd")} - {format(end, "MMM dd")}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {days} {days === 1 ? "Day" : "Days"} off
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-1 max-w-50">
        {row.original.reason || "No reason provided"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status, reviewedBy } = row.original;
      return (
        <div className="flex flex-col">
          <Badge variant={status === "approved" ? "active" : status === "rejected" ? "rejected" : "pending"} className="w-fit">
            {status}
          </Badge>
          {reviewedBy && reviewedBy.fullName && (
            <span className="text-xs text-muted-foreground mt-1 font-medium">
              Reviewed by {reviewedBy.fullName.split(" ")[0]}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons request={row.original} />,
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { ViewRequestModal } from "./view-request-modal";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { updateManagerRequestStatus } from "@/services/admin.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import React from "react";

import { IManagerRequest } from "@/types/manager-request.type";
import { IUser } from "@/types/user.type";

function ActionButtons({ request }: { request: IManagerRequest }) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const user = request.userId as IUser;

  const handleStatusUpdate = async (newStatus: "approved" | "rejected") => {
    setIsUpdating(true);
    try {
      const response = await updateManagerRequestStatus(request._id, {
        status: newStatus,
        adminNote: newStatus === "approved" ? "Approved for mess creation." : "Your request was rejected.",
      });
      if (response?.success) {
        SuccessToast(response.message || `Request ${newStatus} successfully!`);
      } else {
        ErrorToast(response?.message || "Failed to update request.");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ViewRequestModal request={request} />
          </TooltipTrigger>
          <TooltipContent>View Details</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {request.status === "pending" && (
        <>
          <ConfirmationModal
            title="Approve Request?"
            description={`Are you sure you want to approve manager access for ${user.fullName}?`}
            confirmText="Approve"
            loadingText="Approving..."
            onConfirm={() => handleStatusUpdate("approved")}
            isLoading={isUpdating}
            trigger={
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <CheckCircle2 />
              </Button>
            }
          />

          <ConfirmationModal
            title="Reject Request?"
            description={`Are you sure you want to reject manager access for ${user.fullName}?`}
            confirmText="Reject"
            loadingText="Rejecting..."
            onConfirm={() => handleStatusUpdate("rejected")}
            isLoading={isUpdating}
            trigger={
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
              >
                <XCircle />
              </Button>
            }
          />
        </>
      )}
    </div>
  );
}

export const columns: ColumnDef<IManagerRequest>[] = [
  {
    accessorKey: "userId.fullName",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.userId as IUser;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-bold">{user.fullName}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "userId.phone",
    header: "Phone",
    cell: ({ row }) => {
      const user = row.original.userId as IUser;
      return <span className="text-sm font-medium">{user.phone}</span>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <div className="max-w-xs">
        <p className="text-sm line-clamp-2 italic text-muted-foreground">
          &quot;{row.original.reason}&quot;
        </p>
      </div>
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
            status === "approved" 
              ? "success" 
              : status === "rejected" 
                ? "rejected" 
                : "pending"
          }
          className="uppercase text-[10px]"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Requested On",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Review</div>,
    cell: ({ row }) => <ActionButtons request={row.original} />,
  },
];

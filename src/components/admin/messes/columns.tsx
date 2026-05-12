"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { IMess } from "@/types/mess.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { suspendMess } from "@/services/admin.service";
import { SuccessToast, ErrorToast, cn } from "@/lib/utils";
import { MessDetailsModal } from "./mess-details-modal";
import { Textarea } from "@/components/ui/textarea";

function ActionButtons({ mess }: { mess: IMess }) {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [note, setNote] = React.useState("");

  const handleToggleStatus = async () => {
    const messId = mess._id;
    if (!messId) {
      ErrorToast("Mess ID is missing. Please refresh.");
      return;
    }

    setIsUpdating(true);
    const newStatus = mess.status === "active" ? "suspended" : "active";
    try {
      const response = await suspendMess(messId, {
        status: newStatus,
        suspensionNote: note || (newStatus === "suspended" ? "Violation of platform policies." : "Re-activated by Admin."),
      });
      if (response?.success) {
        SuccessToast(response.message || `Mess status updated successfully!`);
        setNote("");
        setIsModalOpen(false);
      } else {
        ErrorToast(response?.message || "Failed to update mess status.");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <MessDetailsModal mess={mess} />

      <ConfirmationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={mess.status === "active" ? "Suspend Mess?" : "Activate Mess?"}
        description={`Are you sure you want to ${mess.status === "active" ? "suspend" : "activate"} ${mess.name}?`}
        confirmText={mess.status === "active" ? "Suspend" : "Activate"}
        loadingText="Updating..."
        onConfirm={handleToggleStatus}
        isLoading={isUpdating}
        trigger={
          <Button 
            variant="outline" 
            size="icon-sm" 
            className={mess.status === "active" ? "text-rose-600" : "text-emerald-600"}
          >
            {mess.status === "active" ? <ShieldAlert /> : <CheckCircle2 />}
          </Button>
        }
      >
        <div className="pt-4 space-y-3">
          <p className="text-xs text-muted-foreground">
            {mess.status === "active" ? "Suspension" : "Activation"} Note (Optional)
          </p>
          <Textarea 
            placeholder={mess.status === "active" ? "Reason for suspension..." : "Note for activation..."}
            className={cn(
              "min-h-24 bg-muted focus-visible:ring-offset-0",
              mess.status === "active" ? "focus-visible:ring-rose-500" : "focus-visible:ring-emerald-500"
            )}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </ConfirmationModal>
    </div>
  );
}

export const columns: ColumnDef<IMess>[] = [
  {
    accessorKey: "name",
    header: "Mess",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-sm">{row.original.name}</span>
          <Badge variant="outline" className="text-[10px] px-1.5 h-4 border-primary/20 text-primary font-normal">
            {row.original.inviteCode}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground truncate max-w-48">
          {row.original.address}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => {
      const manager = row.original.manager;
      return (
        <div className="flex flex-col">
          <span className="text-sm">{manager?.fullName || "N/A"}</span>
          <span className="text-xs text-muted-foreground">
            {manager?.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "memberCount",
    header: "Members",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.memberCount || 0}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "success" : status === "suspended" ? "rejected" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons mess={row.original} />,
  },
];

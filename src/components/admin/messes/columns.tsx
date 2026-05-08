"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import React from "react";
import { IMess } from "@/types/mess.type";
import { IUser } from "@/types/user.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { suspendMess } from "@/services/admin.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { MessDetailsModal } from "./mess-details-modal";

function ActionButtons({ mess }: { mess: IMess }) {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    try {
      const response = await suspendMess(mess.id);
      if (response?.success) {
        SuccessToast(response.message || `Mess status updated successfully!`);
      } else {
        ErrorToast(response?.message || "Failed to update mess status.");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <MessDetailsModal mess={mess} />

      <ConfirmationModal
        title={mess.status === "active" ? "Suspend Mess?" : "Activate Mess?"}
        description={`Are you sure you want to ${mess.status === "active" ? "suspend" : "activate"} ${mess.name}?`}
        confirmText={mess.status === "active" ? "Suspend" : "Activate"}
        loadingText="Updating..."
        onConfirm={handleToggleStatus}
        isLoading={isUpdating}
        trigger={
          <Button 
            variant="ghost" 
            size="icon" 
            className={mess.status === "active" ? "text-rose-600 hover:bg-rose-50" : "text-emerald-600 hover:bg-emerald-50"}
          >
            {mess.status === "active" ? <ShieldAlert /> : <CheckCircle2 />}
          </Button>
        }
      />
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
          <span className="text-sm font-bold">{row.original.name}</span>
          <Badge variant="outline" className="text-[10px] font-mono px-1.5 h-4 border-primary/20 text-primary">
            {row.original.inviteCode}
          </Badge>
        </div>
        <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-tight truncate max-w-48">
          {row.original.address}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => {
      const manager = row.original.managerId as IUser;
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{manager?.fullName || "N/A"}</span>
          <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-tight">
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
      <Badge variant="secondary" className="px-2 py-0.5 h-5 text-[10px] font-bold uppercase tracking-wider">
        {row.original.memberCount || 0} Members
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
      <span className="text-sm text-muted-foreground font-medium">
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

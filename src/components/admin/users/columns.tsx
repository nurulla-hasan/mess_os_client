"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Shield, Ban, UserCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { IUser } from "@/types/user.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { updateUserStatus } from "@/services/admin.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { useRouter } from "next/navigation";

function ActionButtons({ user }: { user: IUser }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    const newStatus = user.status === "active" ? "blocked" : "active";
    
    try {
      const response = await updateUserStatus((user.id || user._id) as string, newStatus);
      if (response?.success) {
        SuccessToast(response.message || `User ${newStatus} successfully!`);
        setIsModalOpen(false);
        router.refresh();
      } else {
        ErrorToast(response?.message || "Failed to update status.");
      }
    } catch  {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>User Details</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-600">
              <Shield className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Update Global Role</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ConfirmationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={user.status === "active" ? "Block User" : "Unblock User"}
        description={
          user.status === "active"
            ? `Are you sure you want to block ${user.fullName}? They will lose access to the platform.`
            : `Are you sure you want to unblock ${user.fullName}? They will regain access to the platform.`
        }
        confirmText={user.status === "active" ? "Block User" : "Unblock User"}
        cancelText="Cancel"
        onConfirm={handleStatusUpdate}
        isLoading={isLoading}
        variant={user.status === "active" ? "destructive" : "default"}
        actionTrigger={
          <Button 
            variant="ghost" 
            size="icon" 
            className={user.status === "active" ? "h-7 w-7 text-rose-600" : "h-7 w-7 text-emerald-600"}
          >
            {user.status === "active" ? (
              <Ban className="h-3.5 w-3.5" />
            ) : (
              <UserCheck className="h-3.5 w-3.5" />
            )}
          </Button>
        }
      />
    </div>
  );
}

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "fullName",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
          {row.original.fullName.charAt(0)}
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold truncate">{row.original.fullName}</span>
          <span className="text-xs text-muted-foreground truncate">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "globalRole",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.globalRole;
      return (
        <Badge 
          variant={role === "super_admin" ? "manager" : role === "manager" ? "info" : "secondary"} 
          className="capitalize text-xs py-0.5 px-2"
        >
          {role.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge 
          variant={status === "active" ? "success" : "rejected"}
          className="capitalize text-xs py-0.5 px-2"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Registered",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons user={row.original} />,
  },
];

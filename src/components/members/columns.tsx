"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, UserMinus } from "lucide-react";
import { format } from "date-fns";
import { IMember } from "@/types/member.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { updateMemberStatus, removeMember } from "@/services/mess.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { ViewMemberModal } from "./view-member-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActionButtonsProps {
  member: IMember;
}

function ActionButtons({ member }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<"approve" | "reject" | "remove" | null>(null);

  const activeMessId = member.messId;

  const handleAction = async () => {
    if (!actionType || !activeMessId) return;
    setIsLoading(true);
    try {
      let res;
      if (actionType === "approve") {
        res = await updateMemberStatus(activeMessId, member._id, "active");
      } else if (actionType === "reject") {
        res = await updateMemberStatus(activeMessId, member._id, "rejected");
      } else if (actionType === "remove") {
        res = await removeMember(activeMessId, member._id);
      }

      if (res?.success) {
        SuccessToast(res.message || "Action successful!");
        setIsConfirmOpen(false);
      } else {
        ErrorToast(res?.message || "Action failed.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (type: "approve" | "reject" | "remove") => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewMemberModal member={member} />

      {member.status === "pending" && (
        <>
          <Button 
            variant="outline" 
            size="icon-sm" 
            className="text-emerald-600"
            onClick={() => openModal("approve")}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon-sm" 
            className="text-rose-600"
            onClick={() => openModal("reject")}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}

      {member.status === "active" && member.messRole !== "manager" && (
        <Button 
          variant="outline" 
          size="icon-sm" 
          className="text-rose-600"
          onClick={() => openModal("remove")}
        >
          <UserMinus className="h-4 w-4" />
        </Button>
      )}


      {actionType && (
        <ConfirmationModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          trigger={null}
          title={
            actionType === "approve" ? "Approve Member" : 
            actionType === "reject" ? "Reject Request" : "Remove Member"
          }
          description={
            actionType === "approve" ? `Approve ${member.user.fullName} to join the mess?` : 
            actionType === "reject" ? `Reject ${member.user.fullName}'s join request?` : 
            `Are you sure you want to remove ${member.user.fullName}?`
          }
          confirmText={
            actionType === "approve" ? "Approve" : 
            actionType === "reject" ? "Reject" : "Remove Member"
          }
          variant={actionType === "approve" ? "default" : "destructive"}
          isLoading={isLoading}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<IMember>[] = [
  {
    accessorKey: "user.fullName",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border border-primary/10">
          <AvatarImage src={row.original.user.avatar} alt={row.original.user.fullName} />
          <AvatarFallback className="bg-primary/5 text-primary text-xs font-medium">
            {row.original.user.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm text-foreground truncate">{row.original.user.fullName}</span>
          <span className="text-xs text-muted-foreground truncate">{row.original.user.email}</span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "messRole",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.messRole === "manager" ? "manager" : "member"} className="font-medium">
        {row.original.messRole}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "active" : status === "pending" ? "pending" : "rejected"} className="font-medium">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "user.phone",
    header: "Phone",
    cell: ({ row }) => <span className="text-sm text-muted-foreground">{row.original.user.phone}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Joined/Requested",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">
        {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons member={row.original} />,
  },
];

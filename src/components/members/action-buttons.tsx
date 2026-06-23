"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, UserMinus } from "lucide-react";
import { IMember } from "@/types/member.type";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { updateMemberStatus, removeMember } from "@/services/mess.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

import { ViewMemberModal } from "./view-member-modal";

interface ActionButtonsProps {
  member: IMember;
}

export function ActionButtons({ member }: ActionButtonsProps) {
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
      <ViewMemberModal key={member._id} member={member} />

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
          loadingText={
            actionType === "approve" ? "Approving..." :
            actionType === "reject" ? "Rejecting..." : "Removing..."
          }
          variant={actionType === "approve" ? "default" : "destructive"}
          isLoading={isLoading}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}

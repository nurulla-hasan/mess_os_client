"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { formatDate, SuccessToast, ErrorToast } from "@/lib/utils";
import { IComplaint, ComplaintStatus } from "@/types/complaint.type";
import { updateComplaintStatus } from "@/services/complaint.service";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { useUser } from "@/providers/user-provider";
import { ViewComplaintModal } from "./view-complaint-modal";

interface ActionButtonsProps {
  complaint: IComplaint;
}

function ActionButtons({ complaint }: ActionButtonsProps) {
  const { role } = useUser();
  const isManager = role === "manager";
  const [isLoading, setIsLoading] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [pendingStatus, setPendingStatus] = React.useState<ComplaintStatus | null>(null);
  const [resolvedNote, setResolvedNote] = React.useState("");
  const router = useRouter();

  const handleStatusUpdate = async () => {
    if (!pendingStatus) return;
    
    if ((pendingStatus === "resolved" || pendingStatus === "rejected") && !resolvedNote.trim()) {
      ErrorToast("Please provide a resolution note.");
      return;
    }

    setIsLoading(true);
    try {
      const note = pendingStatus === "resolved" || pendingStatus === "rejected" ? resolvedNote.trim() : undefined;
      const res = await updateComplaintStatus(complaint.messId, complaint._id, pendingStatus, note);
      if (res?.success) {
        SuccessToast(res.message || "Status updated.");
        setConfirmOpen(false);
        setResolvedNote("");
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to update status.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirm = (status: ComplaintStatus) => {
    setPendingStatus(status);
    setConfirmOpen(true);
  };

  const currentStatus = complaint.status;

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewComplaintModal complaint={complaint} />

      {isManager && (currentStatus === "open" || currentStatus === "in_progress") && (
        <>
          {currentStatus === "open" && (
            <Button
              variant="outline"
              size="icon-sm"
              className="text-amber-600 hover:text-amber-700"
              onClick={() => openConfirm("in_progress")}
              disabled={isLoading}
              title="Mark In Progress"
            >
              <Clock className="h-3.5 w-3.5" />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon-sm"
            className="text-emerald-600 hover:text-emerald-700"
            onClick={() => openConfirm("resolved")}
            disabled={isLoading}
            title="Mark Resolved"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            className="text-rose-600 hover:text-rose-700"
            onClick={() => openConfirm("rejected")}
            disabled={isLoading}
            title="Mark Rejected"
          >
            <XCircle className="h-3.5 w-3.5" />
          </Button>
        </>
      )}

      {isManager && pendingStatus && (
        <ConfirmationModal
          open={confirmOpen}
          onOpenChange={(open) => {
            setConfirmOpen(open);
            if (!open) {
              setPendingStatus(null);
              setResolvedNote("");
            }
          }}
          trigger={null}
          title={`Mark as ${pendingStatus.replace("_", " ")}?`}
          description={
            pendingStatus === "in_progress" 
              ? "Update status to in progress." 
              : `Provide a resolution note to ${pendingStatus} this complaint.`
          }
          confirmText="Confirm Update"
          isLoading={isLoading}
          onConfirm={handleStatusUpdate}
        >
          {(pendingStatus === "resolved" || pendingStatus === "rejected") && (
            <div className="py-4 border-t border-b my-4">
              <Field>
                <FieldLabel className="mb-2">Resolution Note (Required)</FieldLabel>
                <Textarea 
                  placeholder="Describe how the issue was handled..."
                  value={resolvedNote}
                  onChange={(e) => setResolvedNote(e.target.value)}
                  className="min-h-24"
                />
              </Field>
            </div>
          )}
        </ConfirmationModal>
      )}
    </div>
  );
}

export const columns: ColumnDef<IComplaint>[] = [
  {
    accessorKey: "title",
    header: "Complaint Detail",
    cell: ({ row }) => {
      const user = row.original.messMemberId.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-primary/10">
            <AvatarImage src={user.avatar} alt={user.fullName} />
            <AvatarFallback className="text-xs font-bold bg-primary/5">
              {user.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold truncate max-w-64">{row.original.title}</span>
            <span className="text-xs text-muted-foreground uppercase font-bold">
              by {user.fullName}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variants: Record<string, "success" | "warning" | "destructive" | "info" | "muted"> = {
        open: "info",
        in_progress: "warning",
        resolved: "success",
        rejected: "destructive",
      };
      return (
        <Badge variant={variants[status] || "muted"} className="capitalize">
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Submitted",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground font-medium">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionButtons complaint={row.original} />,
  },
];

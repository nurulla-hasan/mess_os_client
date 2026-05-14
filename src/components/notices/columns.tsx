"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pin, Archive, Loader2 } from "lucide-react";
import { INotice } from "@/types/notice.type";
import { toggleNoticePin, archiveNotice } from "@/services/notice.service";
import { SuccessToast, ErrorToast, formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { EditNoticeModal } from "./edit-notice-modal";

interface ActionButtonsProps {
  notice: INotice;
}

function ActionButtons({ notice }: ActionButtonsProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmAction, setConfirmAction] = React.useState<"archive" | "delete" | null>(null);
  const router = useRouter();

  const handleTogglePin = async () => {
    setIsLoading(true);
    try {
      const res = await toggleNoticePin(notice.messId, notice._id, !notice.isPinned);
      if (res?.success) {
        SuccessToast(res.message || "Pin status updated.");
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to update pin status.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;
    setIsLoading(true);
    try {
      const res = await archiveNotice(notice.messId, notice._id);

      if (res?.success) {
        SuccessToast(res.message || `${confirmAction} successful.`);
        setConfirmOpen(false);
        router.refresh();
      } else {
        ErrorToast(res?.message || `Failed to ${confirmAction}.`);
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirm = () => {
    setConfirmAction("archive");
    setConfirmOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {notice.status === "active" ? (
        <>
          <EditNoticeModal notice={notice} />

          <Button 
            variant="outline" 
            size="icon-sm" 
            onClick={handleTogglePin}
            disabled={isLoading}
            className={notice.isPinned ? "text-primary border-primary/30 bg-primary/5" : "text-muted-foreground"}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pin className={notice.isPinned ? "h-4 w-4 fill-primary" : "h-4 w-4"} />}
          </Button>

          <Button 
            variant="outline" 
            size="icon-sm" 
            className="text-rose-600 hover:text-rose-700"
            onClick={openConfirm}
            disabled={isLoading}
          >
            <Archive className="h-4 w-4" />
          </Button>
        </>
      ) : null}

      {confirmAction && (
        <ConfirmationModal
          open={confirmOpen}
          onOpenChange={setOpen => {
            setConfirmOpen(setOpen);
            if (!setOpen) setConfirmAction(null);
          }}
          trigger={null}
          title="Archive Notice?"
          description="This will move the notice to archives and unpin it from the board."
          confirmText="Yes, Archive"
          variant="default"
          isLoading={isLoading}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<INotice>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        {row.original.isPinned && <Pin className="h-3 w-3 text-primary fill-primary" />}
        <div className="flex flex-col">
          <span className="text-sm font-bold truncate max-w-64">{row.original.title}</span>
          <span className="text-xs text-muted-foreground italic">
            by {row.original.createdBy.fullName}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "success" : "muted"} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Posted Date",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground font-medium">
        {formatDate(row.original.createdAt)}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ActionButtons notice={row.original} />,
  },
];

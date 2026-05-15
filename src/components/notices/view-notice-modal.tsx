"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, Pin } from "lucide-react";
import { INotice } from "@/types/notice.type";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ViewNoticeModalProps {
  notice: INotice;
  trigger?: React.ReactNode;
}

export function ViewNoticeModal({ notice, trigger }: ViewNoticeModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Notice Details"
      description="View the full content of the announcement."
      actionTrigger={
        trigger || (
          <Button variant="outline" size="icon-sm">
            <Eye className="h-4 w-4" />
          </Button>
        )
      }
    >
      <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
        {/* Header Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-foreground">
              {notice.title}
            </h2>
            {notice.isPinned && (
              <Badge variant="processing" className="gap-1 px-2 py-0.5">
                <Pin className="h-3 w-3 fill-current" /> Pinned
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              <span>{notice.createdBy.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(notice.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl border bg-muted/30 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90 font-medium">
          {notice.content}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

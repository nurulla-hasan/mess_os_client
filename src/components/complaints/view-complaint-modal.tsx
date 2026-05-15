"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { IComplaint } from "@/types/complaint.type";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ViewComplaintModalProps {
  complaint: IComplaint;
}

export function ViewComplaintModal({ complaint }: ViewComplaintModalProps) {
  const [open, setOpen] = React.useState(false);
  const status = complaint.status;
  
  const variants: Record<string, "success" | "warning" | "destructive" | "info" | "muted"> = {
    open: "info",
    in_progress: "warning",
    resolved: "success",
    rejected: "destructive",
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Complaint Details"
      description="View the full description and resolution notes."
      actionTrigger={
        <Button variant="outline" size="icon-sm" className="text-muted-foreground">
          <Eye className="h-4 w-4" />
        </Button>
      }
    >
      <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold leading-tight text-foreground">
              {complaint.title}
            </h2>
            <Badge variant={variants[status] || "muted"} className="capitalize font-bold">
              {status.replace("_", " ")}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5" />
              <span>{complaint.messMemberId.user.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(complaint.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <MessageSquare className="h-3 w-3" /> Description
          </span>
          <div className="p-4 rounded-xl border bg-muted/20 text-sm leading-relaxed text-foreground/80 min-h-[100px]">
            {complaint.description}
          </div>
        </div>

        {complaint.resolvedNote && (
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" /> Resolution Notes
            </span>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-sm leading-relaxed text-foreground/90 italic">
              {complaint.resolvedNote}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

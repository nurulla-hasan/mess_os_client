"use client";

import React, { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { IManagerRequest } from "@/types/manager-request.type";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquareQuote, 
  CheckCircle2, 
  XCircle, 
  User as UserIcon,
  Clock
} from "lucide-react";
import { IUser } from "@/types/user.type";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ViewRequestModalProps {
  request: IManagerRequest;
}

export function ViewRequestModal({ request }: ViewRequestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const user = request.userId as IUser;
  const status = request.status;

  const statusConfig = {
    pending: { class: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Pending Review", icon: Clock },
    approved: { class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", label: "Approved", icon: CheckCircle2 },
    rejected: { class: "bg-destructive/10 text-destructive border-destructive/20", label: "Rejected", icon: XCircle },
  };

  const Config = statusConfig[status];

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Request Details"
      description="Review the user's information and their reason for requesting manager access."
      showClose={true}
      actionTrigger={
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Info className="h-4 w-4" />
        </Button>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Header */}
          <div className={cn("p-4 rounded-xl border flex items-center justify-between", Config.class)}>
            <div className="flex items-center gap-3">
              <Config.icon className="h-5 w-5" />
              <span className="font-bold uppercase tracking-wider text-xs">{Config.label}</span>
            </div>
            <span className="text-[10px] opacity-70 font-medium">
              ID: {request._id}
            </span>
          </div>

          {/* User Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <UserIcon className="h-3 w-3" /> User Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Full Name</p>
                <p className="text-sm font-semibold">{user.fullName}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Email Address</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-primary" />
                  <p className="text-sm font-semibold">{user.email}</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Phone Number</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-primary" />
                  <p className="text-sm font-semibold">{user.phone}</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Requested Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-primary" />
                  <p className="text-sm font-semibold">
                    {format(new Date(request.createdAt), "PPP")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div className="space-y-4 pb-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <MessageSquareQuote className="h-3 w-3" /> Reason for Elevation
            </h4>
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 relative">
              <MessageSquareQuote className="absolute top-4 right-4 h-8 w-8 text-primary/10 -rotate-12" />
              <p className="text-sm leading-relaxed text-foreground/90 italic">
                &quot;{request.reason}&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

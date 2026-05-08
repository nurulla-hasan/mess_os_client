"use client";

import React from "react";
import { Eye, UtensilsCrossed, CreditCard } from "lucide-react";
import * as Icons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { IMess } from "@/types/mess.type";
import { format } from "date-fns";

interface MessDetailsModalProps {
  mess: IMess;
}

export function MessDetailsModal({ mess }: MessDetailsModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Mess Details"
      description="View complete configuration and status details for this mess."
      showClose={true}
      actionTrigger={
        <Button variant="ghost" size="icon">
          <Eye className="h-4.5 w-4.5" />
        </Button>
      }
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Header Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold tracking-tight text-primary">{mess.name}</h3>
              <p className="text-sm text-muted-foreground uppercase font-medium tracking-wide">
                {mess.address}
              </p>
            </div>
            <Badge variant={mess.status === "active" ? "success" : "rejected"} className="uppercase">
              {mess.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-primary/5 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Invite Code</span>
              <p className="text-lg font-mono font-bold text-primary">{mess.inviteCode}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-primary/5 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Created On</span>
              <p className="text-sm font-bold">{format(new Date(mess.createdAt), "MMM dd, yyyy")}</p>
            </div>
          </div>

          {/* Manager Details */}
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Icons.UserCog className="h-4 w-4" />
              <h4 className="text-xs font-black uppercase tracking-widest">Manager Contact</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</span>
                <p className="text-sm font-bold text-foreground/90">{mess.manager?.fullName || "N/A"}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Phone Number</span>
                <p className="text-sm font-bold text-foreground/90">{mess.manager?.phone || "N/A"}</p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</span>
                <p className="text-sm font-bold text-foreground/90">{mess.manager?.email || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <UtensilsCrossed className="h-4 w-4" />
              <h4 className="text-xs font-black uppercase tracking-widest">Meal Categories</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {mess.settings?.mealCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="px-3 py-1 text-xs font-medium">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <CreditCard className="h-4 w-4" />
              <h4 className="text-xs font-black uppercase tracking-widest">Equal Share Categories</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {mess.settings?.equalShareCategories.map((cat) => (
                <Badge key={cat} variant="outline" className="px-3 py-1 text-xs font-medium border-primary/10 bg-primary/5 text-primary">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

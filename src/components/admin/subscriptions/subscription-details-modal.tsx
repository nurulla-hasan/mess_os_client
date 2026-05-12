"use client";

import React from "react";
import { Eye, Home, User, CreditCard, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { ISubscriptionHistory } from "@/types/subscription.type";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface SubscriptionDetailsModalProps {
  history: ISubscriptionHistory;
}

export function SubscriptionDetailsModal({ history }: SubscriptionDetailsModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { subscription, mess, manager, plan } = history;

  const statusVariants: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
    active: "success",
    past_due: "warning",
    canceled: "destructive",
    unpaid: "destructive",
  };

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Subscription Details"
      description="Complete overview of this subscription, mess, and billing status."
      showClose={true}
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
    >
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Subscription Status Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-primary">Subscription Info</h3>
            <p className="text-xs text-muted-foreground font-mono">ID: {subscription._id}</p>
          </div>
          <Badge variant={statusVariants[subscription.status] || "secondary"} className="capitalize font-normal">
            {subscription.status.replace("_", " ")}
          </Badge>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted border border-border/50 space-y-1">
            <span className="text-xs text-muted-foreground">Current Period</span>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>{format(new Date(subscription.currentPeriodStart), "MMM dd")} - {format(new Date(subscription.currentPeriodEnd), "MMM dd, yyyy")}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-muted border border-border/50 space-y-1">
            <span className="text-xs text-muted-foreground">Current Plan</span>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              <span>{plan.name} ({plan.price} {plan.currency})</span>
            </div>
          </div>
        </div>

        {/* Mess & Manager Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Home className="h-4 w-4" />
              <h4 className="text-xs">Mess Details</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Mess Name</span>
                <p className="text-sm font-medium">{mess.name}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Invite Code</span>
                <p className="text-xs font-mono">{mess.inviteCode}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Address</span>
                <p className="text-xs text-muted-foreground leading-relaxed">{mess.address}</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 space-y-4">
            <div className="flex items-center gap-2 text-primary font-medium">
              <User className="h-4 w-4" />
              <h4 className="text-xs">Manager Details</h4>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Full Name</span>
                <p className="text-sm font-medium">{manager.fullName}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Email Address</span>
                <p className="text-xs">{manager.email}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Phone</span>
                <p className="text-xs">{manager.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Features Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-medium">
            <CreditCard className="h-4 w-4" />
            <h4 className="text-xs">Plan Features ({plan.name})</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(plan.features).map(([key, enabled]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                {enabled ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 text-rose-500 opacity-50" />
                )}
                <span className={cn(
                  enabled ? "text-foreground" : "text-muted-foreground",
                  key === 'aiShopping' && enabled && "font-bold text-primary"
                )}>
                  {key === 'aiShopping' ? 'AI Shopping' : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

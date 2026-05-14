"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ISubscriptionHistory } from "@/types/subscription.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, Calendar } from "lucide-react";

import { SubscriptionDetailsModal } from "./subscription-details-modal";

import { formatDate, formatDateShort, getInitials } from "@/lib/utils";

export const columns: ColumnDef<ISubscriptionHistory>[] = [
  {
    accessorKey: "mess",
    header: "Mess Info",
    cell: ({ row }) => {
      const mess = row.original.mess;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded bg-primary/10 flex items-center justify-center">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">{mess?.name || "N/A"}</span>
          </div>
          <span className="text-xs text-muted-foreground ml-9">
            {mess?.inviteCode || "No Code"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "manager",
    header: "Manager",
    cell: ({ row }) => {
      const manager = row.original.manager;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src={manager?.avatar} alt={manager?.fullName || "User"} />
            <AvatarFallback className="text-xs">{getInitials(manager?.fullName || "U")}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{manager?.fullName || "Unknown Manager"}</span>
            <span className="text-xs text-muted-foreground">{manager?.email || "No Email"}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "plan",
    header: "Plan Details",
    cell: ({ row }) => {
      const plan = row.original.plan;
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs border-primary/20 text-primary">
              {plan?.name || "No Plan"}
            </Badge>
            <span className="text-xs font-medium">
              {plan?.price ?? 0} {plan?.currency || "BDT"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground mt-1 capitalize">
            {plan?.billingCycle || "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "subscription.status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.subscription?.status || "unknown";
      const variants: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
        active: "success",
        past_due: "warning",
        canceled: "destructive",
        unpaid: "destructive",
      };

      return (
        <Badge variant={variants[status] || "secondary"} className="capitalize font-normal">
          {status.replace("_", " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "subscription.currentPeriod",
    header: "Billing Period",
    cell: ({ row }) => {
      // Safe destructuring using fallback
      const { currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd } = row.original.subscription || {};
      
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="flex items-center gap-1">
              <span>{currentPeriodStart ? formatDateShort(currentPeriodStart) : "N/A"}</span>
              <span className="text-muted-foreground opacity-50">-</span>
              <span>{currentPeriodEnd ? formatDate(currentPeriodEnd) : "No Expiry"}</span>
            </span>
          </div>
          {cancelAtPeriodEnd && (
            <span className="text-xs text-rose-500 mt-0.5">Cancels at end</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <SubscriptionDetailsModal history={row.original} />
      </div>
    ),
  },
];

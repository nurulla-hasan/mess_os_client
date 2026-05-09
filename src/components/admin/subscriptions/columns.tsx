"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

import { ISubscriptionPlan } from "@/types/subscription.type";

export const columns: ColumnDef<ISubscriptionPlan>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
    cell: ({ row }) => {
      const isDefault = row.original.isDefault;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm">{row.original.name}</span>
          {isDefault && (
            <Badge variant="outline" className="text-xs h-4 px-1.5 bg-primary/10 text-primary border-primary/20 font-normal">
              <Star className="h-2 w-2 mr-1 fill-primary" /> Default
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <span className="text-xs bg-accent px-1.5 py-0.5 rounded">{row.original.code}</span>,
  },
  {
    accessorKey: "price",
    header: "Pricing",
    cell: ({ row }) => {
      const price = row.original.price;
      const currency = row.original.currency;
      return (
        <div className="flex flex-col">
          <span className="text-sm">{price === 0 ? "Free" : `${price} ${currency}`}</span>
          <span className="text-xs text-muted-foreground">{row.original.billingCycle}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "maxMembers",
    header: "Max Members",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Users className="h-3 w-3 text-muted-foreground" />
        <span className="text-sm">{row.original.maxMembers}</span>
      </div>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.original.features;
      const activeCount = Object.values(features).filter(Boolean).length;
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {activeCount} Enabled
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? "success" : "destructive"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];

import { Users } from "lucide-react";

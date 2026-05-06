"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, UserMinus, Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type ActiveMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "manager" | "member";
  status: "active" | "inactive";
  joinedDate: string;
  dueAmount: number;
  advanceAmount: number;
  avatarUrl?: string;
};

export type PendingRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  requestDate: string;
  avatarUrl?: string;
};

export const columns: ColumnDef<ActiveMember>[] = [
  {
    accessorKey: "name",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge variant={role === "manager" ? "manager" : "member"}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "active" ? "active" : "blocked"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "phone",
    header: "Contact",
    cell: ({ row }) => <span className="text-sm">{row.original.phone}</span>,
  },
  {
    accessorKey: "joinedDate",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.joinedDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "financial",
    header: "Financial",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        {row.original.dueAmount > 0 && (
          <Badge variant="rejected" className="w-fit text-xs">
            Due: ৳{row.original.dueAmount}
          </Badge>
        )}
        {row.original.advanceAmount > 0 && (
          <Badge variant="success" className="w-fit text-xs">
            Adv: ৳{row.original.advanceAmount}
          </Badge>
        )}
        {row.original.dueAmount === 0 && row.original.advanceAmount === 0 && (
          <span className="text-xs text-muted-foreground italic">Clear</span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const member = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => console.log("View", member)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => console.log("Remove", member)}
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove Member</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

export const pendingColumns: ColumnDef<PendingRequest>[] = [
  {
    accessorKey: "name",
    header: "Requester",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span className="text-sm">{row.original.phone}</span>,
  },
  {
    accessorKey: "requestDate",
    header: "Requested On",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.requestDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => console.log("Approve", request)}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Approve Request</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => console.log("Reject", request)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reject Request</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

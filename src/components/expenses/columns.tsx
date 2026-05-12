"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye, ReceiptText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type Expense = {
  id: string;
  category: "bazar" | "utility" | "other";
  amount: number;
  date: string;
  paidBy: {
    name: string;
    email: string;
  };
  fundSource: "mess_fund" | "manager_pocket" | "member_reimbursement";
  status: "pending" | "approved" | "rejected";
  reimbursementStatus?: "not_required" | "pending" | "completed";
  notes?: string;
  receiptUrl?: string;
};

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="font-bold">৳{row.original.amount}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.date), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "paidBy",
    header: "Paid By",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm">{row.original.paidBy.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "approved" ? "success" : status === "rejected" ? "rejected" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Details</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {expense.receiptUrl && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon-sm" className="text-sky-600">
                    <ReceiptText className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Receipt</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {expense.status === "pending" && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon-sm" className="text-emerald-600">
                      <Check className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Approve Expense</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon-sm" className="text-rose-600">
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reject Expense</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
      );
    },
  },
];

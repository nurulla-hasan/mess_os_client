"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, ReceiptText } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export type UtilityBill = {
  id: string;
  category: "rent" | "internet" | "electricity" | "water" | "gas" | "garbage" | "other";
  amount: number;
  month: string;
  year: number;
  dueDate: string;
  status: "pending" | "paid";
  paidAt?: string;
};

export const columns: ColumnDef<UtilityBill>[] = [
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
    accessorKey: "period",
    header: "Period",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {row.original.month}, {row.original.year}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="font-bold">৳{row.original.amount}</span>,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.dueDate), "MMM dd, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "paid" ? "success" : "pending"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => {
      const bill = row.original;

      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Bill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {bill.status === "pending" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-emerald-600">
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mark as Paid</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {bill.status === "paid" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-sky-600">
                    <ReceiptText className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View Receipt</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
];

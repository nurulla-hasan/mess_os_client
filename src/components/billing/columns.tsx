"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Printer } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type MemberBill = {
  id: string;
  member: {
    name: string;
    email: string;
  };
  meals: number;
  mealCharge: number;
  equalShare: number;
  previousDue: number;
  credits: number;
  finalDue: number;
  status: "pending" | "paid" | "partial";
};

export const columns: ColumnDef<MemberBill>[] = [
  {
    accessorKey: "member",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">{row.original.member.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "meals",
    header: "Meals",
    cell: ({ row }) => <span className="font-medium">{row.original.meals}</span>,
  },
  {
    accessorKey: "mealCharge",
    header: "Meal Charge",
    cell: ({ row }) => <span className="text-sm">৳{row.original.mealCharge}</span>,
  },
  {
    accessorKey: "equalShare",
    header: "Equal Share",
    cell: ({ row }) => <span className="text-sm">৳{row.original.equalShare}</span>,
  },
  {
    accessorKey: "finalDue",
    header: "Final Due",
    cell: ({ row }) => (
      <span className={`font-bold ${row.original.finalDue > 0 ? "text-rose-500" : "text-emerald-500"}`}>
        ৳{row.original.finalDue}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "paid" ? "success" : status === "partial" ? "pending" : "rejected"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: () => {
      return (
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Bill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm" className="text-sky-600">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download PDF</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon-sm" className="text-slate-600">
                  <Printer className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Print Bill</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

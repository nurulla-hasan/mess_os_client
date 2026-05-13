/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, HandCoins } from "lucide-react";
import { IExpense } from "@/types/expense.type";
import { updateExpenseStatus, reimburseExpense } from "@/services/expense.service";
import { SuccessToast, ErrorToast, formatDate, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ViewExpenseModal } from "./view-expense-modal";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { usePathname } from "next/navigation";

interface ActionButtonsProps {
  expense: IExpense;
}

function ActionButtons({ expense }: ActionButtonsProps) {
  const pathname = usePathname();
  const isManager = pathname.includes("/manager/");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<"approved" | "rejected" | "reimburse" | null>(null);

  const handleAction = async () => {
    if (!actionType) return;
    setIsLoading(true);
    try {
      let res;
      if (actionType === "reimburse") {
        res = await reimburseExpense(expense.messId, expense._id);
      } else {
        res = await updateExpenseStatus(expense.messId, expense._id, actionType);
      }

      if (res?.success) {
        SuccessToast(res.message || "Action completed successfully.");
        setIsConfirmOpen(false);
      } else {
        ErrorToast(res?.message || "Action failed.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirm = (type: "approved" | "rejected" | "reimburse") => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewExpenseModal expense={expense} messId={expense.messId} isManager={isManager} />

      {isManager && expense.status === "pending" && (
        <>
          <Button
            variant="outline"
            size="icon-sm"
            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            onClick={() => openConfirm("approved")}
          >
            <Check className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon-sm"
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            onClick={() => openConfirm("rejected")}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}

      {isManager &&
        expense.status === "approved" &&
        expense.fundSource === "personal_cash" &&
        expense.reimbursementStatus !== "reimbursed" && (
          <Button
            variant="outline"
            size="icon-sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => openConfirm("reimburse")}
          >
            <HandCoins className="h-4 w-4" />
          </Button>
        )}

      {actionType && (
        <ConfirmationModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          trigger={null}
          title={actionType === "reimburse" ? "Confirm Reimbursement" : `Confirm ${actionType}`}
          description={`Are you sure you want to mark this expense as ${actionType === "reimburse" ? "reimbursed" : actionType}?`}
          confirmText={actionType === "reimburse" ? "Confirm Paid" : "Confirm"}
          variant={actionType === "rejected" ? "destructive" : "default"}
          isLoading={isLoading}
          onConfirm={handleAction}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<IExpense>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        {formatDate(row.original.date)}
      </span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="font-bold text-primary">৳{row.original.amount}</span>,
  },
  {
    accessorKey: "paidBy",
    header: "Paid By",
    cell: ({ row }) => {
      const paidBy = row.original.paidBy;
      const user = paidBy?.userId;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={user?.avatar} alt={user?.fullName} />
            <AvatarFallback className="text-xs">
              {getInitials(user?.fullName || "Unknown")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-foreground leading-none text-xs truncate max-w-[120px]">
              {user?.fullName || "Unknown"}
            </span>
            <span className="text-xs text-muted-foreground uppercase font-medium mt-1">
              {paidBy?.messRole}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "fundSource",
    header: "Fund Source",
    cell: ({ row }) => {
      const source = row.original.fundSource;
      return (
        <Badge
          variant={source === "mess_cash" ? "processing" : "warning"}
        >
          {source?.replace("_", " ") || "N/A"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const badgeVariant = status === "approved" ? "success" : (status === "canceled" ? "muted" : status);
      return (
        <Badge variant={badgeVariant as any}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons expense={row.original} />,
  },
];

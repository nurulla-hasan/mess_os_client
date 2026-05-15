/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Calendar, 
  Tag, 
  Wallet, 
  Eye, 
  HandCoins,
  ExternalLink,
  LucideIcon,
  Check,
  X
} from "lucide-react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IExpense } from "@/types/expense.type";
import { updateExpenseStatus, reimburseExpense } from "@/services/expense.service";
import { SuccessToast, ErrorToast, formatDate, getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ViewExpenseModalProps {
  expense: IExpense;
  messId: string;
  isManager?: boolean;
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number | undefined;
  subValue?: string;
  variant?: "default" | "warning" | "success" | "info" | "processing";
}

const DetailItem = ({
  icon: Icon,
  label,
  value,
  subValue,
  variant = "default",
}: DetailItemProps) => {
  const getIconColor = () => {
    switch (variant) {
      case "warning": return "text-amber-600 dark:text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "success": return "text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "info": 
      case "processing": return "text-blue-600 dark:text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-muted-foreground bg-muted border-muted/50";
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-muted/50 text-left">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center border shrink-0 ${getIconColor()}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <span className="text-sm font-bold text-foreground truncate">
          {value || "N/A"}
        </span>
        {subValue && (
          <span className="text-xs text-muted-foreground font-medium truncate uppercase">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export function ViewExpenseModal({ expense, messId, isManager = false }: ViewExpenseModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const user = expense.paidBy?.userId;

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    setIsLoading(true);
    try {
      const res = await updateExpenseStatus(messId, expense._id, status);
      if (res?.success) {
        SuccessToast(res.message || `Expense ${status} successfully.`);
        setOpen(false);
      } else {
        ErrorToast(res?.message || "Failed to update status.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReimburse = async () => {
    setIsLoading(true);
    try {
      const res = await reimburseExpense(messId, expense._id);
      if (res?.success) {
        SuccessToast(res.message || "Expense marked as reimbursed.");
        setOpen(false);
      } else {
        ErrorToast(res?.message || "Failed to reimburse.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const badgeVariant = expense.status === "approved" ? "success" : (expense.status === "canceled" ? "muted" : expense.status);

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Expense Details"
      description="View expenditure details and manage approval status."
      showClose
      actionTrigger={
        <Button variant="outline" size="icon-sm" className="text-muted-foreground">
          <Eye className="h-4 w-4" />
        </Button>
      }
    >
      <div className="p-0 max-h-[50vh] overflow-y-auto">
        <div className="flex items-center gap-5 p-5 bg-muted dark:bg-muted border-b">
          <Avatar className="h-14 w-14 border border-primary/10 shadow-sm">
            <AvatarImage src={user?.avatar} alt={user?.fullName} />
            <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold uppercase">
              {getInitials(user?.fullName || "Unknown Member")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <h3 className="text-lg font-bold text-foreground truncate">{user?.fullName || "Unknown Member"}</h3>
              <Badge
                variant={badgeVariant as any}
                className="px-2.5 py-0 font-bold text-xs uppercase tracking-wider h-5"
              >
                {expense.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5 uppercase tracking-wide font-medium">
              {expense.paidBy?.messRole} • {expense.paidBy?.status}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem
              icon={DollarSign}
              label="Amount"
              value={`৳${expense.amount}`}
              subValue="Total cost"
              variant="success"
            />
            <DetailItem
              icon={Calendar}
              label="Expense Date"
              value={formatDate(expense.date)}
              subValue="Transaction date"
            />
            <DetailItem
              icon={Tag}
              label="Category"
              value={expense.category}
              subValue="Expense type"
              variant="info"
            />
            <DetailItem
              icon={Wallet}
              label="Fund Source"
              value={expense.fundSource?.replace("_", " ")}
              subValue="Money source"
              variant={expense.fundSource === "mess_cash" ? "processing" : "warning"}
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* Receipt Section */}
            {expense.receiptUrl && (
              <Button 
                variant="outline" 
                className="w-full justify-between h-12 px-4 group"
                asChild
              >
                <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <ReceiptText className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold">View Receipt / Voucher</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </Button>
            )}

            {/* Reimbursement Status */}
            <div className={cn(
              "p-4 rounded-lg border flex items-center justify-between",
              expense.reimbursementStatus === "reimbursed" 
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-700" 
                : "bg-muted border-muted/50"
            )}>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center",
                  expense.reimbursementStatus === "reimbursed" ? "bg-emerald-500/20" : "bg-muted-foreground/10"
                )}>
                  <HandCoins className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">Reimbursement</span>
                  <span className="text-sm font-bold capitalize">{expense.reimbursementStatus.replace("_", " ")}</span>
                </div>
              </div>
              {isManager && expense.status === "approved" && expense.fundSource === "personal_cash" && expense.reimbursementStatus !== "reimbursed" && (
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 bg-background hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                  onClick={handleReimburse}
                  disabled={isLoading}
                >
                  Mark as Paid
                </Button>
              )}
            </div>
          </div>

          {/* Action Buttons for Managers */}
          {isManager && expense.status === "pending" && (
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300"
                onClick={() => handleStatusUpdate("rejected")}
                disabled={isLoading}
              >
                <X className="mr-2 h-4 w-4" /> Reject
              </Button>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={() => handleStatusUpdate("approved")}
                disabled={isLoading}
              >
                <Check className="mr-2 h-4 w-4" /> Approve
              </Button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

function ReceiptText({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <path d="M12 17.5V6.5"/>
    </svg>
  );
}

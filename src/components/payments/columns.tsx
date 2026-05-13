"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, XCircle } from "lucide-react";
import { format } from "date-fns";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { updatePaymentStatus } from "@/services/payment.service";
import { IPayment, IPaymentMember, PaymentStatus } from "@/types/payment.type";
import { ViewPaymentModal } from "./view-payment-modal";

const getMember = (payment: IPayment): IPaymentMember | null => {
  return typeof payment.messMemberId === "object" ? payment.messMemberId : null;
};

interface ActionButtonsProps {
  payment: IPayment;
}

function ActionButtons({ payment }: ActionButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isManagerRoute = pathname.startsWith("/manager");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState<Extract<PaymentStatus, "approved" | "rejected" | "canceled"> | null>(null);

  const openModal = (type: Extract<PaymentStatus, "approved" | "rejected" | "canceled">) => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!actionType) return;
    setIsLoading(true);
    try {
      const res = await updatePaymentStatus(payment.messId, payment._id, actionType);
      if (res.success) {
        SuccessToast(res.message || `Payment ${actionType}.`);
        setIsConfirmOpen(false);
        router.refresh();
      } else {
        ErrorToast(res.message || "Failed to update payment.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalCopy = {
    approved: {
      title: "Approve Payment",
      description: "Approve this payment and add it to the member ledger?",
      confirmText: "Approve",
      variant: "default" as const,
    },
    rejected: {
      title: "Reject Payment",
      description: "Reject this pending payment record?",
      confirmText: "Reject",
      variant: "destructive" as const,
    },
    canceled: {
      title: "Cancel Payment",
      description: "Cancel this pending payment record?",
      confirmText: "Cancel Payment",
      variant: "destructive" as const,
    },
  };

  return (
    <div className="flex items-center justify-end gap-1">
      <ViewPaymentModal payment={payment} />

      {isManagerRoute && payment.status === "pending" && (
        <>
          <Button variant="outline" size="icon-sm" className="text-emerald-600" onClick={() => openModal("approved")}>
            <Check />
          </Button>
          <Button variant="outline" size="icon-sm" className="text-rose-600" onClick={() => openModal("rejected")}>
            <X />
          </Button>
        </>
      )}

      {!isManagerRoute && payment.status === "pending" && (
        <Button variant="outline" size="icon-sm" className="text-rose-600" onClick={() => openModal("canceled")}>
          <XCircle />
        </Button>
      )}

      {actionType && (
        <ConfirmationModal
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          trigger={null}
          title={modalCopy[actionType].title}
          description={modalCopy[actionType].description}
          confirmText={modalCopy[actionType].confirmText}
          variant={modalCopy[actionType].variant}
          isLoading={isLoading}
          onConfirm={handleStatusUpdate}
        />
      )}
    </div>
  );
}

export const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "messMemberId",
    header: "Member",
    cell: ({ row }) => {
      const member = getMember(row.original);
      const user = member?.user || member?.userId;

      return (
        <div className="flex flex-col min-w-40">
          <span className="font-bold text-foreground">{user?.fullName || "Member"}</span>
          <span className="text-xs text-muted-foreground truncate max-w-48">
            {user?.email || (typeof row.original.messMemberId === "string" ? row.original.messMemberId : "")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="font-bold text-primary">BDT {row.original.amount.toLocaleString()}</span>,
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <Badge variant="secondary" className="uppercase font-mono text-xs">
        {row.original.method}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variantMap: Record<PaymentStatus, "success" | "rejected" | "pending" | "secondary"> = {
        approved: "success",
        rejected: "rejected",
        pending: "pending",
        canceled: "secondary",
      };

      return <Badge variant={variantMap[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground line-clamp-1 max-w-[150px]">
        {row.original.reference || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">{format(new Date(row.original.createdAt), "MMM dd, yyyy")}</span>
        <span className="text-xs text-muted-foreground">{format(new Date(row.original.createdAt), "hh:mm a")}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-end">Actions</div>,
    cell: ({ row }) => <ActionButtons payment={row.original} />,
  },
];

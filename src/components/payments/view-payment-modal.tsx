"use client";

import { format } from "date-fns";
import { Eye, ReceiptText, UserRound, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { IPayment, IPaymentMember } from "@/types/payment.type";
import React from "react";

interface ViewPaymentModalProps {
  payment: IPayment;
}

const getPaymentMember = (payment: IPayment): IPaymentMember | null => {
  return typeof payment.messMemberId === "object" ? payment.messMemberId : null;
};

export function ViewPaymentModal({ payment }: ViewPaymentModalProps) {
  const [open, setOpen] = React.useState(false);
  const member = getPaymentMember(payment);
  const user = member?.user || member?.userId;

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Payment Details"
      description="Review the submitted deposit record."
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
      showClose
    >
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold">BDT {payment.amount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground uppercase">{payment.method}</p>
            </div>
          </div>
          <Badge variant={payment.status === "approved" ? "success" : payment.status === "rejected" ? "rejected" : payment.status === "canceled" ? "secondary" : "pending"}>
            {payment.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1 rounded-md border p-3">
            <p className="text-xs text-muted-foreground uppercase">Member</p>
            <p className="font-semibold flex items-center gap-2"><UserRound className="h-4 w-4" /> {user?.fullName || "Member"}</p>
            <p className="text-xs text-muted-foreground">{user?.email || (typeof payment.messMemberId === "string" ? payment.messMemberId : "")}</p>
          </div>
          <div className="space-y-1 rounded-md border p-3">
            <p className="text-xs text-muted-foreground uppercase">Submitted</p>
            <p className="font-semibold">{format(new Date(payment.createdAt), "MMM dd, yyyy")}</p>
            <p className="text-xs text-muted-foreground">{format(new Date(payment.createdAt), "hh:mm a")}</p>
          </div>
        </div>

        <div className="space-y-2 rounded-md border p-3">
          <p className="text-xs text-muted-foreground uppercase flex items-center gap-2"><ReceiptText className="h-4 w-4" /> Reference</p>
          <p className="text-sm break-words">{payment.reference || "No reference provided."}</p>
        </div>

        {payment.receivedDate && (
          <div className="space-y-1 rounded-md border p-3">
            <p className="text-xs text-muted-foreground uppercase">Received Date</p>
            <p className="text-sm font-medium">{format(new Date(payment.receivedDate), "MMM dd, yyyy hh:mm a")}</p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

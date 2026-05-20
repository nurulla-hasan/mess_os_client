"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { createPayment } from "@/services/payment.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";

interface PayNowButtonProps {
  messId: string;
  amount: number;
  cycleLabel: string;
}

export function PayNowButton({ messId, amount, cycleLabel }: PayNowButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const payload = {
        amount,
        method: "cash" as const,
        reference: `Bill payment for ${cycleLabel}`,
      };

      const res = await createPayment(messId, payload);
      if (res.success) {
        SuccessToast(res.message || "Payment submitted for approval.");
        setOpen(false);
      } else {
        ErrorToast(res.message || "Failed to submit payment.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationModal
      open={open}
      onOpenChange={setOpen}
      title="Submit Payment Record?"
      description={`You are about to submit a cash payment record of ৳${amount.toLocaleString()} for ${cycleLabel}. This will be reviewed by your manager.`}
      confirmText="Yes, Submit"
      loadingText="Submitting..."
      isLoading={isLoading}
      onConfirm={handlePay}
      trigger={
        <Button className="w-full">
          <CreditCard className="mr-2 h-4 w-4" /> Pay Now (৳{amount.toLocaleString()})
        </Button>
      }
    />
  );
}

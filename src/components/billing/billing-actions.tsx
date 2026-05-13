"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { finalizeBilling, reopenBilling } from "@/services/billing.service";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { IBillingCycle } from "@/types/billing.type";

interface BillingActionsProps {
  cycle: IBillingCycle;
  messId: string;
}

export function BillingActions({ cycle, messId }: BillingActionsProps) {
  const [loading, setLoading] = useState(false);
  const [showFinalize, setShowFinalize] = useState(false);
  const [showReopen, setShowReopen] = useState(false);

  const handleFinalize = async () => {
    setLoading(true);
    try {
      const res = await finalizeBilling(messId, { 
        month: cycle.month, 
        year: cycle.year 
      });
      if (res.success) {
        SuccessToast("Billing finalized successfully.");
      } else {
        ErrorToast(res.message);
      }
    } catch (error: unknown) {
      ErrorToast((error as Error)?.message || "Failed to finalize billing.");
    } finally {
      setLoading(false);
      setShowFinalize(false);
    }
  };

  const handleReopen = async () => {
    setLoading(true);
    try {
      const res = await reopenBilling(messId, cycle._id);
      if (res.success) {
        SuccessToast("Billing cycle reopened.");
      } else {
        ErrorToast(res.message);
      }
    } catch (error: unknown) {
      ErrorToast((error as Error)?.message || "Failed to reopen billing.");
    } finally {
      setLoading(false);
      setShowReopen(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {cycle.status === "draft" ? (
        <>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1.5 text-xs font-bold"
            onClick={() => setShowFinalize(true)}
            disabled={loading}
          >
            <Lock className="h-3.5 w-3.5" />
            Finalize Billing
          </Button>
          <ConfirmationModal
            open={showFinalize}
            onOpenChange={setShowFinalize}
            title="Finalize Billing?"
            description="This will calculate final dues for all members and lock the records for this month. You can still reopen it if needed."
            onConfirm={handleFinalize}
            isLoading={loading}
            variant="default"
            confirmText="Finalize Now"
            loadingText="Finalizing..."
          />
        </>
      ) : (
        <>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5 text-xs font-bold border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
            onClick={() => setShowReopen(true)}
            disabled={loading}
          >
            <Unlock className="h-3.5 w-3.5" />
            Reopen Cycle
          </Button>
          <ConfirmationModal
            open={showReopen}
            onOpenChange={setShowReopen}
            title="Reopen Billing?"
            description="Are you sure you want to unlock this billing cycle? This will allow changes to meals and expenses for this month."
            onConfirm={handleReopen}
            isLoading={loading}
            confirmText="Reopen Cycle"
            loadingText="Reopening..."
          />
        </>
      )}
    </div>
  );
}

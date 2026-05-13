"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Check, 
  X
} from "lucide-react";
import { payUtilityBill, deleteUtilityBill } from "@/services/utility.service";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { IUtilityBill } from "@/types/utility.type";
import { useRouter } from "next/navigation";

interface UtilityActionsProps {
  bill: IUtilityBill;
  messId: string;
}

export function UtilityActions({ bill, messId }: UtilityActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await payUtilityBill(messId, bill._id);
      if (res.success) {
        SuccessToast(`${bill.category} bill marked as paid.`);
        router.refresh();
      } else {
        ErrorToast(res.message);
      }
    } catch (error: unknown) {
      ErrorToast((error as Error).message || "Failed to process payment.");
    } finally {
      setLoading(false);
      setShowPayModal(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteUtilityBill(messId, bill._id);
      if (res.success) {
        SuccessToast("Utility bill deleted successfully.");
        router.refresh();
      } else {
        ErrorToast(res.message);
      }
    } catch (error: unknown) {
      ErrorToast((error as Error).message || "Failed to delete bill.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button 
        variant="outline" 
        size="icon-sm" 
        className="h-8 w-8 text-muted-foreground"
        title="View Details"
      >
        <Eye className="h-4 w-4" />
      </Button>

      {bill.status === "unpaid" && (
        <Button 
          variant="outline" 
          size="icon-sm" 
          className="text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50"
          onClick={() => setShowPayModal(true)}
          title="Mark as Paid"
        >
          <Check className="h-4 w-4" />
        </Button>
      )}

      <Button 
        variant="outline" 
        size="icon-sm" 
        className="text-rose-500 hover:text-rose-600 hover:bg-rose-50"
        onClick={() => setShowDeleteModal(true)}
        title="Delete Bill"
      >
        <X className="h-4 w-4" />
      </Button>

      <ConfirmationModal
        open={showPayModal}
        onOpenChange={setShowPayModal}
        trigger={null}
        title="Confirm Payment"
        description={`Are you sure you want to mark this ${bill.category} bill as paid? This will update the mess ledger.`}
        onConfirm={handlePay}
        isLoading={loading}
        confirmText="Confirm Payment"
        variant="default"
      />

      <ConfirmationModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        trigger={null}
        title="Delete Bill"
        description="Are you sure you want to delete this utility bill? This action cannot be undone."
        onConfirm={handleDelete}
        isLoading={loading}
        confirmText="Delete Now"
        variant="destructive"
      />
    </div>
  );
}

"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowRight, Clock, CheckCircle2, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SuccessToast, ErrorToast, cn } from "@/lib/utils";
import {
  requestManagerAccess,
  getMyManagerRequest,
} from "@/services/user.service";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { IManagerRequest, RequestStatus } from "@/types/manager-request.type";

export function RequestManagerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [, setIsLoadingStatus] = useState(false);
  const [existingRequest, setExistingRequest] =
    useState<IManagerRequest | null>(null);

  const fetchRequestStatus = useCallback(async () => {
    setIsLoadingStatus(true);
    try {
      const response = await getMyManagerRequest();
      if (response?.success && response.data) {
        setExistingRequest(response.data);
        setRequestReason(response.data.reason || "");
      }
    } catch (error) {
      console.error("Error fetching manager request status:", error);
    } finally {
      setIsLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    fetchRequestStatus();
  }, [fetchRequestStatus]);

  const handleRequestManager = async () => {
    if (!requestReason.trim()) {
      ErrorToast("Please provide a reason for your request.");
      return;
    }

    setIsSubmittingRequest(true);
    try {
      const response = await requestManagerAccess({ reason: requestReason });
      if (response?.success) {
        SuccessToast(response.message || "Request submitted successfully!");
        setIsOpen(false);
        fetchRequestStatus(); // Refresh status
      } else {
        ErrorToast(response?.message || "Failed to submit request.");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const getStatusConfig = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return {
          icon: <Clock className="h-4 w-4" />,
          label: "Pending Review",
          class: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          description:
            "Your request is currently being reviewed by the super admin. Please wait for approval.",
        };
      case "approved":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          label: "Approved",
          class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          description:
            "Your request has been approved! You should have manager access now.",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-4 w-4" />,
          label: "Rejected",
          class: "bg-destructive/10 text-destructive border-destructive/20",
          description:
            "Your request was unfortunately rejected. You can try submitting a new request with a better reason.",
        };
      default:
        return {
          icon: <Info className="h-4 w-4" />,
          label: "Unknown",
          class: "bg-muted text-muted-foreground border-border",
          description: "We couldn't determine the status of your request.",
        };
    }
  };

  const isPending = existingRequest?.status === "pending";
  const isApproved = existingRequest?.status === "approved";
  const statusConfig = existingRequest
    ? getStatusConfig(existingRequest.status)
    : null;

  return (
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Manager Access Request"
      description={
        existingRequest
          ? statusConfig?.description
          : "To create and manage a mess, you need manager privileges. Please provide a reason for your request."
      }
      showClose={isPending || isApproved}
      actionTrigger={
        <Button
          size="lg"
          variant={isPending ? "outline" : isApproved ? "secondary" : "default"}
          className="gap-3"
        >
          {isPending
            ? "Request Pending"
            : isApproved
              ? "Access Approved"
              : "Request Manager Access"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[50vh]">
          {existingRequest && (
            <div
              className={cn(
                "p-4 rounded-lg border flex items-center justify-between",
                statusConfig?.class,
              )}
            >
              <div className="flex items-center gap-3">
                {statusConfig?.icon}
                <span className="font-bold uppercase tracking-wider text-xs">
                  {statusConfig?.label}
                </span>
              </div>
              <span className="text-xs opacity-70 font-medium uppercase">
                Status Update
              </span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="reason"
                className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                Your Request Reason
              </Label>
              <Textarea
                id="reason"
                placeholder="Example: I want to create and manage my own mess for my college hostel."
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                disabled={isPending || isApproved}
                className="bg-muted min-h-32"
              />
            </div>

            {existingRequest?.status === "rejected" &&
              existingRequest.adminNote && (
                <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-3 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Admin Feedback
                    </span>
                  </div>
                  <p className="text-sm italic text-foreground/80 leading-relaxed">
                    &quot;{existingRequest.adminNote}&quot;
                  </p>
                </div>
              )}
          </div>
        </div>

        {!isPending && !isApproved && (
          <div className="p-6 border-t bg-muted flex items-center justify-end">
            <Button
              size="lg"
              onClick={handleRequestManager}
              disabled={!requestReason.trim()}
              loading={isSubmittingRequest}
              loadingText="Submitting..."
              className="w-full sm:w-auto"
            >
              {existingRequest?.status === "rejected"
                ? "Re-submit Request"
                : "Submit Request"}
            </Button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

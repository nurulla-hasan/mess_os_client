"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Shield, Loader2, ArrowRight, Clock, CheckCircle2, XCircle, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { SuccessToast, ErrorToast, cn } from "@/lib/utils";
import { requestManagerAccess, getMyManagerRequest } from "@/services/user.service";
import { IManagerRequest, RequestStatus } from "@/types/user.type";

export function RequestManagerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [, setIsLoadingStatus] = useState(false);
  const [existingRequest, setExistingRequest] = useState<IManagerRequest | null>(null);

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
          description: "Your request is currently being reviewed by the super admin. Please wait for approval."
        };
      case "approved":
        return { 
          icon: <CheckCircle2 className="h-4 w-4" />, 
          label: "Approved", 
          class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          description: "Your request has been approved! You should have manager access now."
        };
      case "rejected":
        return { 
          icon: <XCircle className="h-4 w-4" />, 
          label: "Rejected", 
          class: "bg-destructive/10 text-destructive border-destructive/20",
          description: "Your request was unfortunately rejected. You can try submitting a new request with a better reason."
        };
      default:
        return { 
          icon: <Info className="h-4 w-4" />, 
          label: "Unknown", 
          class: "bg-muted text-muted-foreground border-border",
          description: "We couldn't determine the status of your request."
        };
    }
  };

  const isPending = existingRequest?.status === "pending";
  const isApproved = existingRequest?.status === "approved";
  const statusConfig = existingRequest ? getStatusConfig(existingRequest.status) : null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className={cn(
            "group/btn shadow-lg transition-all",
            isPending 
              ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 hover:shadow-amber-500/30" 
              : isApproved
                ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 hover:shadow-emerald-500/30"
                : "shadow-primary/20 hover:shadow-primary/30"
          )}
        >
          {isPending ? "Request Pending" : isApproved ? "Access Approved" : "Request Manager Access"}
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Manager Access Request
            {existingRequest && (
              <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider font-bold", statusConfig?.class)}>
                <span className="mr-1">{statusConfig?.icon}</span>
                {statusConfig?.label}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            {existingRequest 
              ? statusConfig?.description 
              : "To create and manage a mess, you need manager privileges. Please provide a reason for your request."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-semibold">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Example: I want to create and manage my own mess for my college hostel."
              className="min-h-30 bg-background/50 border-primary/10 focus-visible:ring-primary/30 disabled:opacity-80"
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              disabled={isPending || isApproved}
            />
            {!isPending && !isApproved && (
              <p className="text-xs text-muted-foreground">
                Your request will be reviewed by the super admin.
              </p>
            )}
            {isPending && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-500 text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>Submitted on {existingRequest?.createdAt && new Date(existingRequest.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSubmittingRequest}>
            {isPending || isApproved ? "Close" : "Cancel"}
          </Button>
          {!isPending && !isApproved && (
            <Button 
              onClick={handleRequestManager} 
              disabled={isSubmittingRequest || !requestReason.trim()}
              className="min-w-35 shadow-lg shadow-primary/20"
            >
              {isSubmittingRequest ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : existingRequest?.status === "rejected" ? (
                "Re-submit Request"
              ) : (
                "Submit Request"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import { Shield, Loader2, ArrowRight } from "lucide-react";
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
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { requestManagerAccess } from "@/services/user.service";

export function RequestManagerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

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
        setRequestReason("");
      } else {
        ErrorToast(response?.message || "Failed to submit request.");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
        >
          Request Manager Access
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125 border-primary/20 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">Request Manager Access</DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            To create and manage a mess, you need manager privileges. Please provide a reason for your request.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-semibold">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Example: I want to create and manage my own mess for my college hostel."
              className="min-h-30 bg-background/50 border-primary/10 focus-visible:ring-primary/30"
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Your request will be reviewed by the super admin.
            </p>
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSubmittingRequest}>
            Cancel
          </Button>
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
            ) : (
              "Submit Request"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, Hash } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { joinMess } from "@/services/mess.service";
import { useRouter } from "next/navigation";

export function JoinMessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleJoinMess = async () => {
    if (!inviteCode.trim()) {
      ErrorToast("Please enter an invite code.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await joinMess({ inviteCode: inviteCode.trim() });
      if (response?.success) {
        SuccessToast(response.message || "Successfully joined the mess!");
        setIsOpen(false);
        setInviteCode("");
        router.push("/dashboard");
      } else {
        ErrorToast(response?.message || "Failed to join mess. Invalid code?");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          Join with Code
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Mess</DialogTitle>
          <DialogDescription>
            Enter the unique invite code shared by your mess manager to join their community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="inviteCode">Invite Code</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="inviteCode"
                placeholder="Ex: MESS-123-ABC"
                className="pl-10"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Codes are case-sensitive. Ask your manager if you don&apos;t have one.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleJoinMess} 
            disabled={isSubmitting || !inviteCode.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Mess"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

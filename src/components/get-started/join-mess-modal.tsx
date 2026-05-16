"use client";

import { useState } from "react";
import { ArrowRight, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { joinMess } from "@/services/mess.service";
import { useRouter } from "next/navigation";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";

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
    <ModalWrapper
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Join a Mess"
      description="Enter the unique invite code shared by your mess manager to join their community."
      showClose={false}
      actionTrigger={
        <Button size="lg" className="gap-3">
          Join with Code
          <ArrowRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteCode" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Invite Code
              </Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input
                  id="inviteCode"
                  placeholder="Ex: MESS-123-ABC"
                  className="pl-10"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                />
              </div>
              <p className="text-xs text-muted-foreground font-medium uppercase ">
                Codes are case-sensitive. Ask your manager if you don&apos;t have one.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-muted flex items-center justify-end">
          <Button
            size="lg"
            onClick={handleJoinMess}
            loading={isSubmitting}
            loadingText="Joining..."
            disabled={isSubmitting || !inviteCode.trim()}
            className="w-full sm:w-auto"
          >
            Join Mess
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { ErrorToast, SuccessToast } from "@/lib/utils";
import { getMessMemberOptions } from "@/services/mess.service";
import { createPayment } from "@/services/payment.service";
import { IMemberOption } from "@/types/member.type";

interface CreatePaymentModalProps {
  messId: string;
  mode?: "manager" | "member";
}

const paymentMethods = ["cash", "bkash", "nagad", "rocket", "bank"];

export function CreatePaymentModal({ messId, mode = "member" }: CreatePaymentModalProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [members, setMembers] = React.useState<IMemberOption[]>([]);
  const [messMemberId, setMessMemberId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [method, setMethod] = React.useState("cash");
  const [reference, setReference] = React.useState("");

  React.useEffect(() => {
    if (!open || mode !== "manager") return;
    getMessMemberOptions(messId).then((res) => {
      if (res.success) setMembers(res.data || []);
    });
  }, [open, messId, mode]);

  const resetForm = () => {
    setMessMemberId("");
    setAmount("");
    setMethod("cash");
    setReference("");
  };

  const handleSubmit = async () => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      ErrorToast("Please enter a valid amount.");
      return;
    }

    if (mode === "manager" && !messMemberId) {
      ErrorToast("Please select a member.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await createPayment(messId, {
        ...(mode === "manager" ? { messMemberId } : {}),
        amount: numericAmount,
        method,
        ...(reference.trim() ? { reference: reference.trim() } : {}),
      });

      if (res.success) {
        SuccessToast(res.message || "Payment submitted successfully.");
        setOpen(false);
        resetForm();
        router.refresh();
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
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title={mode === "manager" ? "Add Payment" : "Submit Payment"}
      description={
        mode === "manager"
          ? "Create a pending payment record for any active member."
          : "Submit your deposit record for manager approval."
      }
      actionTrigger={
        <Button className="w-full sm:w-auto shadow-lg shadow-primary/20">
          <Plus className="h-4 w-4" /> {mode === "manager" ? "Add Payment" : "Submit Payment"}
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-5">
        {mode === "manager" && (
          <div className="space-y-2">
            <Label>Member</Label>
            <Select value={messMemberId} onValueChange={setMessMemberId}>
              <SelectTrigger>
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member._id} value={member._id}>
                    {member.name} {member.phone ? `- ${member.phone}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              min="1"
              placeholder="e.g. 1500"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map((item) => (
                  <SelectItem key={item} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Reference</Label>
          <Input
            placeholder="Transaction id, note, or receipt reference"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
          />
        </div>

        <div className="rounded-md border bg-muted/40 p-3 flex items-start gap-3 text-sm text-muted-foreground">
          <Wallet className="h-4 w-4 mt-0.5 text-primary" />
          <p>New payments stay pending until a manager approves them.</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isLoading} loading={isLoading} loadingText="Saving...">
            Save Payment
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

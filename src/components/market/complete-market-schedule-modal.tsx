/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Check, Banknote, Landmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { updateMarketScheduleStatus } from "@/services/market-schedule.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { IMarketSchedule } from "@/types/market-schedule.type";
import { useRouter } from "next/navigation";

interface CompleteMarketScheduleModalProps {
  messId: string;
  schedule: IMarketSchedule;
  actorMessMemberId?: string;
}

export function CompleteMarketScheduleModal({ messId, schedule, actorMessMemberId }: CompleteMarketScheduleModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const [actualSpent, setActualSpent] = React.useState<string>(
    schedule.estimatedBudget?.toString() || ""
  );
  const [fundSource, setFundSource] = React.useState<string>("mess_cash");

  const handleComplete = async () => {
    const spent = parseFloat(actualSpent);
    if (isNaN(spent) || spent < 0) {
      ErrorToast("Please enter a valid amount.");
      return;
    }


    setIsLoading(true);
    try {
      const res = await updateMarketScheduleStatus(messId, schedule._id, {
        status: "completed",
        actualSpent: spent,
        fundSource: fundSource,
        actorMessMemberId: actorMessMemberId
      });

      if (res?.success) {
        SuccessToast(res.message || "Duty marked as completed!");
        setOpen(false);
        router.refresh();
      } else {
        ErrorToast(res?.message || "Failed to complete duty.");
      }
    } catch (error: any) {
      ErrorToast(error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Complete Bazaar Duty"
      description="Enter the actual amount spent and the source of funds."
      actionTrigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full"
        >
          <Check className="h-4 w-4" />
        </Button>
      }
    >
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm border-b pb-4">
            <span className="text-muted-foreground">Estimated Budget</span>
            <span className="font-semibold">৳{schedule.estimatedBudget}</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Banknote className="h-4 w-4" /> Actual Spent Amount
            </label>
            <Input 
              type="number" 
              placeholder="e.g. 1200" 
              value={actualSpent}
              onChange={(e) => setActualSpent(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Landmark className="h-4 w-4" /> Fund Source
            </label>
            <Select value={fundSource} onValueChange={setFundSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select fund source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mess_cash">
                  Mess Fund (Manager Cash)
                </SelectItem>
                <SelectItem value="personal_cash">
                  Personal Cash (Self Paid)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleComplete}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Mark as Completed"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

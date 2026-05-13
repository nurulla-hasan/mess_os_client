"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Textarea } from "@/components/ui/textarea";
import { createMealOffRequest } from "@/services/meal-off-request.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface CreateMealOffRequestModalProps {
  messId: string;
}

export function CreateMealOffRequestModal({ messId }: CreateMealOffRequestModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [reason, setReason] = React.useState("");

  const handleSubmit = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      ErrorToast("Please select a valid date range.");
      return;
    }

    if (!reason.trim()) {
      ErrorToast("Please provide a reason.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        startDate: format(dateRange.from, "yyyy-MM-dd"),
        endDate: format(dateRange.to, "yyyy-MM-dd"),
        reason,
      };

      const res = await createMealOffRequest(messId, payload);
      if (res?.success) {
        SuccessToast(res.message || "Meal off request submitted successfully.");
        setOpen(false);
        setReason("");
        setDateRange({ from: new Date(), to: undefined });
      } else {
        ErrorToast(res?.message || "Failed to submit request.");
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
      title="Create Meal Off Request"
      description="Apply to stop meals for a specific date range. This will be reviewed by the mess manager."
      actionTrigger={
        <Button>
          <Plus className="h-4 w-4" /> Create Request
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Date Range</label>
          <DatePickerWithRange 
            date={dateRange} 
            setDate={setDateRange} 
            placeholder="Select start and end dates"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Reason</label>
          <Textarea 
            placeholder="Explain why you need to stop meals (e.g., traveling, illness)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            loading={isLoading}
            loadingText="Submitting..."
          >
            <Save className="mr-2 h-4 w-4" /> Submit Request
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

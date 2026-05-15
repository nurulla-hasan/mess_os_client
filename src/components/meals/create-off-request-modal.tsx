"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { createMealOffRequest } from "@/services/meal-off-request.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface CreateMealOffRequestModalProps {
  messId: string;
  mealCategories: string[];
}

export function CreateMealOffRequestModal({ 
  messId, 
  mealCategories 
}: CreateMealOffRequestModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });
  const [selectedMeals, setSelectedMeals] = React.useState<string[]>(mealCategories);
  const [reason, setReason] = React.useState("");

  // Initialize selectedMeals when mealCategories changes (if it was empty before)
  React.useEffect(() => {
    if (selectedMeals.length === 0 && mealCategories.length > 0) {
      setSelectedMeals(mealCategories);
    }
  }, [mealCategories, selectedMeals.length]);

  const handleMealToggle = (category: string) => {
    setSelectedMeals((prev) =>
      prev.includes(category)
        ? prev.filter((m) => m !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    if (!dateRange?.from || !dateRange?.to) {
      ErrorToast("Please select a valid date range.");
      return;
    }

    if (selectedMeals.length === 0) {
      ErrorToast("Please select at least one meal category.");
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
        meals: selectedMeals,
        reason,
      };

      const res = await createMealOffRequest(messId, payload);
      if (res?.success) {
        SuccessToast(res.message || "Meal off request submitted successfully.");
        setOpen(false);
        setReason("");
        setDateRange({ from: new Date(), to: undefined });
        setSelectedMeals(mealCategories);
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
      description="Apply to stop specific meals for a date range. Defaults to all meals (full-day off)."
      actionTrigger={
        <Button>
          <Plus className="h-4 w-4" /> Create Request
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Date Range
          </label>
          <DatePickerWithRange 
            date={dateRange} 
            setDate={setDateRange} 
            placeholder="Select start and end dates"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Select Meals to Off
          </label>
          <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-muted/50 border border-muted-foreground/10">
            {mealCategories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox 
                  id={`meal-${category}`}
                  checked={selectedMeals.includes(category)}
                  onCheckedChange={() => handleMealToggle(category)}
                />
                <label 
                  htmlFor={`meal-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground italic">
            * Selected meals will be suspended for the selected dates.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            Reason
          </label>
          <Textarea 
            placeholder="Explain why you need to stop meals (e.g., traveling, office lunch)..."
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

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Sparkles, Calendar as CalendarIcon, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, ErrorToast, SuccessToast } from "@/lib/utils";
import { generateAiShoppingList } from "@/services/ai-shopping.service";
import { IMenuPlan } from "@/types/menu-plan.type";

interface GenerateAiShoppingListModalProps {
  messId: string;
  menuPlans: IMenuPlan[];
}

export function GenerateAiShoppingListModal({
  messId,
  menuPlans,
}: GenerateAiShoppingListModalProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [menuPlanId, setMenuPlanId] = React.useState("");
  const [targetDate, setTargetDate] = React.useState<Date>(new Date());

  const handleGenerate = async () => {
    if (!menuPlanId) {
      ErrorToast("Please select a menu plan.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await generateAiShoppingList(messId, {
        menuPlanId,
        targetDate: format(targetDate, "yyyy-MM-dd"),
      });

      if (res.success) {
        SuccessToast(res.message || "AI shopping list generated.");
        setOpen(false);
        setMenuPlanId("");
        router.refresh();
      } else {
        ErrorToast(res.message || "Failed to generate list.");
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
      title="Generate AI Shopping List"
      description="Create a shopping draft from an existing menu plan."
      actionTrigger={
        <Button>
          <Sparkles/> Generate New List
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Menu Plan</label>
          <Select value={menuPlanId} onValueChange={setMenuPlanId}>
            <SelectTrigger>
              <SelectValue placeholder="Select menu plan" />
            </SelectTrigger>
            <SelectContent>
              {menuPlans.map((plan) => (
                <SelectItem key={plan._id} value={plan._id}>
                  {format(new Date(plan.date), "MMM dd, yyyy")} - {plan.status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {menuPlans.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Create a menu plan first.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Market Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !targetDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon/>
                {targetDate ? (
                  format(targetDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={targetDate}
                onSelect={(date) => date && setTargetDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
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
            onClick={handleGenerate}
            disabled={menuPlans.length === 0}
            loading={isLoading}
            loadingText="Generating..."
          >
            <Save/> Generate
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

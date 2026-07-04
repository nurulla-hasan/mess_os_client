"use client";

import React, { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createMenuPlan } from "@/services/menu-plan.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface AiGenerateMenuPlanModalProps {
  messId: string;
}

export function AiGenerateMenuPlanModal({ messId }: AiGenerateMenuPlanModalProps) {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  
  const [aiPreference, setAiPreference] = useState("");
  const [aiBudget, setAiBudget] = useState<number | "">("");
  const [aiPersonCount, setAiPersonCount] = useState<number | "">("");
  const [avoidRecentDays, setAvoidRecentDays] = useState<number>(7);

  const handleGenerate = async () => {
    if (!date) {
      ErrorToast("Please select a date.");
      return;
    }

    setIsGenerating(true);
    try {
      const payload: Parameters<typeof createMenuPlan>[1] = {
        date: format(date, "yyyy-MM-dd"),
        isAiGenerated: true,
      };

      if (aiPreference.trim()) payload.aiPreference = aiPreference.trim();
      if (typeof aiBudget === "number") payload.aiBudget = aiBudget;
      if (typeof aiPersonCount === "number") payload.aiPersonCount = aiPersonCount;
      payload.aiShoppingDays = 1;
      if (avoidRecentDays !== undefined) payload.avoidRecentDays = avoidRecentDays;

      const res = await createMenuPlan(messId, payload);
      
      if (res.success) {
        SuccessToast(res.message || "Menu plan generated successfully by AI!");
        setOpen(false);
        // Reset form
        setDate(new Date());
        setAiPreference("");
        setAiBudget("");
        setAiPersonCount("");
        setAvoidRecentDays(7);
      } else {
        ErrorToast(res.message || "Failed to generate menu plan.");
      }
    } catch {
      ErrorToast("Something went wrong during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="AI Menu Optimization"
      description="Let AI generate the perfect menu based on your constraints and members' past meals."
      actionTrigger={
        <Button variant="outline" className="w-full gap-3 sm:w-auto">
          <Sparkles className="h-4 w-4" /> AI Generate
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6 max-h-[50vh] overflow-y-auto">
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-medium">Target Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-primary">
              Dietary Preference (Optional)
            </Label>
            <textarea
              placeholder="e.g. Healthy, Low Cost, Bangla, Spicy...&#10;Write as much detail as you want"
              value={aiPreference}
              onChange={(e) => setAiPreference(e.target.value)}
              className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary">
                Budget Limit (Optional)
              </Label>
              <Input
                type="number"
                placeholder="e.g. 1500"
                value={aiBudget}
                onChange={(e) => setAiBudget(e.target.value ? Number(e.target.value) : "")}
                className="focus-visible:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary">
                People Count
              </Label>
              <Input
                type="number"
                min={1}
                placeholder="e.g. 10"
                value={aiPersonCount}
                onChange={(e) => setAiPersonCount(e.target.value ? Number(e.target.value) : "")}
                className="focus-visible:ring-primary/20"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-primary" title="Avoid repeating meals from recent days">
                Avoid Recent (Days)
              </Label>
              <Input
                type="number"
                min={0}
                max={30}
                placeholder="7"
                value={avoidRecentDays}
                onChange={(e) => setAvoidRecentDays(Number(e.target.value))}
                className="focus-visible:ring-primary/20"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isGenerating}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} loading={isGenerating} loadingText="Generating..." className="gap-3 px-8">
            <Sparkles />
            Generate with AI
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

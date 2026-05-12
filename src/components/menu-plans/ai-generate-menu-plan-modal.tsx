"use client";

import React, { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar as CalendarIcon, Loader2 } from "lucide-react";
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
  const [avoidRecentDays, setAvoidRecentDays] = useState<number>(7);

  const handleGenerate = async () => {
    if (!date) {
      ErrorToast("Please select a date.");
      return;
    }

    setIsGenerating(true);
    try {
      const payload: Parameters<typeof createMenuPlan>[1] = {
        date: date.toISOString(),
        isAiGenerated: true,
      };

      if (aiPreference.trim()) payload.aiPreference = aiPreference.trim();
      if (typeof aiBudget === "number") payload.aiBudget = aiBudget;
      if (avoidRecentDays !== undefined) payload.avoidRecentDays = avoidRecentDays;

      const res = await createMenuPlan(messId, payload);
      
      if (res.success) {
        SuccessToast(res.message || "Menu plan generated successfully by AI!");
        setOpen(false);
        // Reset form
        setDate(new Date());
        setAiPreference("");
        setAiBudget("");
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
        <Button variant="outline" className="gap-2">
          <Sparkles className="h-4 w-4" /> AI Generate
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <div className="flex flex-col gap-2">
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
            <Label className="text-xs font-black uppercase tracking-widest text-primary">
              Dietary Preference (Optional)
            </Label>
            <Input
              placeholder="e.g. Healthy, Low Cost, Bangla, Spicy..."
              value={aiPreference}
              onChange={(e) => setAiPreference(e.target.value)}
              className="focus-visible:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-primary">
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
              <Label className="text-xs font-black uppercase tracking-widest text-primary" title="Avoid repeating meals from recent days">
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
          <Button onClick={handleGenerate} disabled={isGenerating} className="gap-2 px-8">
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate with AI
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

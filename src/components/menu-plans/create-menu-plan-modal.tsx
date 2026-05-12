"use client";

import React, { useEffect, useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Save, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getMessDetails } from "@/services/mess.service";
import { createMenuPlan } from "@/services/menu-plan.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface CreateMenuPlanModalProps {
  messId: string;
}

export function CreateMenuPlanModal({ messId }: CreateMenuPlanModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [categories, setCategories] = useState<string[]>([]);
  const [meals, setMeals] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && messId) {
      const fetchSettings = async () => {
        setIsLoading(true);
        try {
          const res = await getMessDetails(messId);
          if (res.success && res.data.settings?.mealCategories) {
            setCategories(res.data.settings.mealCategories);
            // Initialize empty meals for all categories
            const initialMeals: Record<string, string> = {};
            res.data.settings.mealCategories.forEach(cat => {
              initialMeals[cat] = "";
            });
            setMeals(initialMeals);
          }
        } catch (error) {
          console.error("Failed to fetch mess settings:", error);
          ErrorToast("Failed to load meal categories.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchSettings();
    }
  }, [open, messId]);

  const handleSave = async () => {
    if (!date) {
      ErrorToast("Please select a date.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await createMenuPlan(messId, {
        date: date.toISOString(),
        meals,
        isAiGenerated: false
      });
      
      if (res.success) {
        SuccessToast(res.message || "Menu plan created successfully!");
        setOpen(false);
        // Reset form
        setDate(new Date());
      } else {
        ErrorToast(res.message || "Failed to create menu plan.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleMealChange = (category: string, value: string) => {
    setMeals(prev => ({ ...prev, [category]: value }));
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Create New Menu Plan"
      description="Plan your meals for a specific date."
      actionTrigger={
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Plan
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium">Select Date</Label>
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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
            <p className="text-sm text-muted-foreground italic">Loading categories...</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
              {categories.map((category) => (
                <div key={category} className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-primary/70">
                    {category}
                  </Label>
                  <Textarea
                    placeholder={`What's for ${category.toLowerCase()}?`}
                    value={meals[category] || ""}
                    onChange={(e) => handleMealChange(category, e.target.value)}
                    className="resize-none min-h-20 focus-visible:ring-primary/20 transition-all border-muted-foreground/20"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t">
              <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="gap-2 px-8">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Create Plan
              </Button>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

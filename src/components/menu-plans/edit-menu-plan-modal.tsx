"use client";

import React, { useEffect, useState } from "react";
import { IMenuPlan } from "@/types/menu-plan.type";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Edit, Save, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getMessDetails } from "@/services/mess.service";
import { updateMenuPlan } from "@/services/menu-plan.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";

interface EditMenuPlanModalProps {
  plan: IMenuPlan;
}

export function EditMenuPlanModal({ plan }: EditMenuPlanModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [meals, setMeals] = useState<Record<string, string>>(plan.meals || {});

  useEffect(() => {
    if (open) {
      const fetchSettings = async () => {
        setIsLoading(true);
        try {
          const res = await getMessDetails(plan.messId);
          if (res.success && res.data.settings?.mealCategories) {
            setCategories(res.data.settings.mealCategories);
            
            // Initialize missing categories from plan.meals
            const updatedMeals = { ...plan.meals };
            res.data.settings.mealCategories.forEach(cat => {
              if (!updatedMeals[cat]) updatedMeals[cat] = "";
            });
            setMeals(updatedMeals);
          } else {
            // Fallback to existing meal keys if settings can't be fetched
            setCategories(Object.keys(plan.meals));
          }
        } catch (error) {
          console.error("Failed to fetch mess settings:", error);
          setCategories(Object.keys(plan.meals));
        } finally {
          setIsLoading(false);
        }
      };
      fetchSettings();
    }
  }, [open, plan.messId, plan.meals]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateMenuPlan(plan.messId, plan._id, { meals });
      if (res.success) {
        SuccessToast(res.message || "Menu plan updated successfully!");
        setOpen(false);
      } else {
        ErrorToast(res.message || "Failed to update menu plan.");
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
      title="Edit Menu Plan"
      description="Update the meal details for this day."
      actionTrigger={
        <Button
          variant="ghost"
          size="icon"
          className="text-amber-600 dark:text-amber-500 hover:bg-amber-500/10"
        >
          <Edit />
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
            <p className="text-sm text-muted-foreground italic">Loading categories...</p>
          </div>
        ) : (
          <>
            <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
              {categories.map((category) => (
                <div key={category} className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-primary/70">
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
                Save Changes
              </Button>
            </div>
          </>
        )}
      </div>
    </ModalWrapper>
  );
}

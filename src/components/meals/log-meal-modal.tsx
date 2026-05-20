"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Save, Calendar as CalendarIcon, UserPlus, Coffee, Users } from "lucide-react";
import { format } from "date-fns";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getMessMemberOptions, getMessDetails } from "@/services/mess.service";
import { bulkLogMeals } from "@/services/meal.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { IMemberOption } from "@/types/member.type";
import { IMealBreakdown } from "@/types/meal.type";
import { MealEntryRow } from "./meal-entry-row";

interface LogMealModalProps {
  messId: string;
}

interface MealEntry {
  id: string; 
  messMemberId: string;
  meals: IMealBreakdown;
}

const GUEST_MEAL_CATEGORY = "Guest";

const normalizeMealCategory = (category: string) => category.trim().toLowerCase();

const isDefaultVisibleMeal = (category: string) => {
  const normalized = normalizeMealCategory(category);
  return normalized === "lunch" || normalized === "dinner";
};

const formatMealCategoryLabel = (category: string) => category.trim().replace(/\b\w/g, (char) => char.toUpperCase());


export function LogMealModal({ messId }: LogMealModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [members, setMembers] = React.useState<IMemberOption[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());
  const [mealCategories, setMealCategories] = React.useState<string[]>([]);
  
  const [visibleMeals, setVisibleMeals] = React.useState<Record<string, boolean>>({
    [GUEST_MEAL_CATEGORY]: false
  });

  const [initialMeals, setInitialMeals] = React.useState<IMealBreakdown>({
    [GUEST_MEAL_CATEGORY]: 0
  });

  const [entries, setEntries] = React.useState<MealEntry[]>([]);

  React.useEffect(() => {
    if (open && messId) {
      const fetchData = async () => {
        const [membersRes, messRes] = await Promise.all([
          getMessMemberOptions(messId),
          getMessDetails(messId)
        ]);

        if (membersRes?.success) {
          setMembers(membersRes.data.filter((member) => member.participation?.meals !== false));
        }

        if (messRes?.success) {
          const categories = (messRes.data.settings?.mealCategories || ["breakfast", "lunch", "dinner"])
            .map(normalizeMealCategory)
            .filter(Boolean);
          setMealCategories(categories);
          
          // Set initial visibility and values based on categories
          const newVisible: Record<string, boolean> = { [GUEST_MEAL_CATEGORY]: false };
          const newInitial: IMealBreakdown = {
            [GUEST_MEAL_CATEGORY]: 0
          };
          
          categories.forEach((cat: string) => {
            // Default: Lunch/Dinner visible and 1, others hidden and 0
            newVisible[cat] = isDefaultVisibleMeal(cat);
            newInitial[cat] = isDefaultVisibleMeal(cat) ? 1 : 0;
          });
          
          setVisibleMeals(newVisible);
          setInitialMeals(newInitial);
          setEntries([{ id: Math.random().toString(), messMemberId: "", meals: { ...newInitial } }]);
        }
      };
      fetchData();
    }
  }, [open, messId]);

  const addEntry = React.useCallback(() => {
    setEntries(prev => [...prev, { id: Math.random().toString(), messMemberId: "", meals: { ...initialMeals } }]);
  }, [initialMeals]);

  const addAllMembers = React.useCallback(() => {
    const allEntries = members.map(m => ({
      id: Math.random().toString(),
      messMemberId: m._id,
      meals: { ...initialMeals }
    }));
    setEntries(allEntries);
  }, [members, initialMeals]);

  const removeEntry = React.useCallback((id: string) => {
    setEntries(prev => prev.length > 1 ? prev.filter(e => e.id !== id) : prev);
  }, []);

  const updateEntryMember = React.useCallback((id: string, messMemberId: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, messMemberId } : e));
  }, []);

  const updateEntryMeal = React.useCallback((id: string, type: keyof IMealBreakdown, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setEntries(prev => prev.map(e => 
      e.id === id 
        ? { ...e, meals: { ...e.meals, [type]: numValue } } 
        : e
    ));
  }, []);

  const toggleMealVisibility = React.useCallback((type: string) => {
    setVisibleMeals(prev => ({ ...prev, [type]: !prev[type] }));
  }, []);

  const handleSubmit = async () => {
    const validEntries = entries.filter(e => e.messMemberId);
    if (validEntries.length === 0) {
      ErrorToast("Please select at least one member.");
      return;
    }

    setIsLoading(true);
    try {
      const allowedPayloadCategories = new Set([...mealCategories, GUEST_MEAL_CATEGORY]);
      const payload = {
        date: format(date, "yyyy-MM-dd"),
        entries: validEntries.map(({ messMemberId, meals }) => ({
          messMemberId,
          meals: Object.fromEntries(
            Object.entries(meals).filter(([category]) => allowedPayloadCategories.has(category))
          )
        }))
      };

      const res = await bulkLogMeals(messId, payload);
      if (res?.success) {
        SuccessToast(res.message || "Meals logged successfully.");
        setOpen(false);
        setEntries([{ id: Math.random().toString(), messMemberId: "", meals: { ...initialMeals } }]);
      } else {
        ErrorToast(res?.message || "Failed to log meals.");
      }
    } catch {
      ErrorToast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const activeCount = Object.values(visibleMeals).filter(Boolean).length;

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Log Daily Meals"
      description="Select members and record their consumption breakdown."
      actionTrigger={
        <Button className="w-full sm:w-auto">
          <Plus /> Log Meal
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6 max-h-[50vh] overflow-y-auto">
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Select Date</label>
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

        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Member Breakdown</label>
              <div className="flex flex-wrap items-center gap-3">
                {mealCategories.map((cat) => (
                  <Button 
                    key={cat}
                    variant={visibleMeals[cat] ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-xs px-2 gap-1 font-bold uppercase "
                    onClick={() => toggleMealVisibility(cat)}
                  >
                    {cat === "breakfast" && <Coffee className="h-3 w-3" />}
                    {formatMealCategoryLabel(cat)}
                  </Button>
                ))}
                <Button 
                  variant={visibleMeals[GUEST_MEAL_CATEGORY] ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs px-2 gap-1 font-bold uppercase "
                  onClick={() => toggleMealVisibility(GUEST_MEAL_CATEGORY)}
                >
                  <Users className="h-3 w-3" /> Guest
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addAllMembers}
                className="h-9 border-dashed"
                title="Add all active members at once"
              >
                <UserPlus className="h-4 w-4" /> All Members
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addEntry}
                className="h-9"
              >
                <Plus className="h-4 w-4" /> Row
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 overflow-y-auto pr-1 pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/20">
            {entries.map((entry) => (
              <MealEntryRow
                key={entry.id}
                entry={entry}
                members={members}
                visibleMeals={visibleMeals}
                activeCount={activeCount}
                canRemove={entries.length > 1}
                onRemove={removeEntry}
                onUpdateMember={updateEntryMember}
                onUpdateMeal={updateEntryMeal}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t mt-auto">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={isLoading}
            loadingText="Logging..."
          >
            <Save /> Save Records
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

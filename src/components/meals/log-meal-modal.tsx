"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, Calendar as CalendarIcon, UserPlus, Coffee, Users } from "lucide-react";
import { format } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { getMessMembers } from "@/services/mess.service";
import { bulkLogMeals } from "@/services/meal.service";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { IMember } from "@/types/member.type";
import { IMealBreakdown } from "@/types/meal.type";

interface LogMealModalProps {
  messId: string;
}

interface MealEntry {
  id: string; 
  messMemberId: string;
  meals: IMealBreakdown;
}

export function LogMealModal({ messId }: LogMealModalProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [members, setMembers] = React.useState<IMember[]>([]);
  const [date, setDate] = React.useState<Date>(new Date());
  
  // State to track which meal types are visible
  const [visibleMeals, setVisibleMeals] = React.useState<{
    Breakfast: boolean;
    Lunch: boolean;
    Dinner: boolean;
    Guest: boolean;
  }>({
    Breakfast: false,
    Lunch: true,
    Dinner: true,
    Guest: false
  });

  const initialMeals: IMealBreakdown = {
    Breakfast: 0,
    Lunch: 1,
    Dinner: 1,
    Guest: 0
  };

  const [entries, setEntries] = React.useState<MealEntry[]>([
    { id: Math.random().toString(), messMemberId: "", meals: { ...initialMeals } }
  ]);

  React.useEffect(() => {
    if (open && messId) {
      const fetchMembers = async () => {
        const res = await getMessMembers(messId, { status: "active" });
        if (res?.success) {
          setMembers(res.data);
        }
      };
      fetchMembers();
    }
  }, [open, messId]);

  const addEntry = () => {
    setEntries([...entries, { id: Math.random().toString(), messMemberId: "", meals: { ...initialMeals } }]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const updateEntryMember = (id: string, messMemberId: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, messMemberId } : e));
  };

  const updateEntryMeal = (id: string, type: keyof IMealBreakdown, value: string) => {
    const numValue = value === "" ? 0 : parseFloat(value);
    setEntries(entries.map(e => 
      e.id === id 
        ? { ...e, meals: { ...e.meals, [type]: numValue } } 
        : e
    ));
  };

  const toggleMealVisibility = (type: keyof typeof visibleMeals) => {
    setVisibleMeals(prev => ({ ...prev, [type]: !prev[type] }));
    
    // If enabling breakfast, set default to 1 for new entries if needed?
    // Actually, just toggling visibility is enough.
  };

  const handleSubmit = async () => {
    const validEntries = entries.filter(e => e.messMemberId);
    if (validEntries.length === 0) {
      ErrorToast("Please select at least one member.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        date: date.toISOString(),
        entries: validEntries.map(({ messMemberId, meals }) => ({
          messMemberId,
          meals
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

  // Count how many meal types are visible to calculate grid cols
  const activeCount = Object.values(visibleMeals).filter(Boolean).length;

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Log Daily Meals"
      description="Select members and record their consumption breakdown."
      actionTrigger={
        <Button>
          <Plus className="h-4 w-4" /> Log Meal
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Member Breakdown</label>
              <div className="flex items-center gap-2">
                <Button 
                  variant={visibleMeals.Breakfast ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-[10px] px-2 gap-1 font-bold uppercase tracking-tight"
                  onClick={() => toggleMealVisibility("Breakfast")}
                >
                  <Coffee className="h-3 w-3" /> Breakfast
                </Button>
                <Button 
                  variant={visibleMeals.Guest ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-[10px] px-2 gap-1 font-bold uppercase tracking-tight"
                  onClick={() => toggleMealVisibility("Guest")}
                >
                  <Users className="h-3 w-3" /> Guest
                </Button>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addEntry}
              className="h-9"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Add Row
            </Button>
          </div>
          
          <div className="space-y-4 max-h-75 overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div key={entry.id} className="flex flex-col gap-3 p-3 rounded-lg border bg-muted/20 relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeEntry(entry.id)}
                  disabled={entries.length === 1}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>

                <div className="w-full pr-8">
                  <Select 
                    value={entry.messMemberId} 
                    onValueChange={(val) => updateEntryMember(entry.id, val)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select Member" />
                    </SelectTrigger>
                    <SelectContent>
                      {members.map((m) => (
                        <SelectItem key={m._id} value={m._id}>
                          {m.user.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div 
                  className="grid gap-2" 
                  style={{ gridTemplateColumns: `repeat(${activeCount}, minmax(0, 1fr))` }}
                >
                  {visibleMeals.Breakfast && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase text-center">B</span>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.5"
                        value={entry.meals.Breakfast}
                        onChange={(e) => updateEntryMeal(entry.id, "Breakfast", e.target.value)}
                        className="h-8 text-center px-1"
                      />
                    </div>
                  )}
                  {visibleMeals.Lunch && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase text-center">L</span>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.5"
                        value={entry.meals.Lunch}
                        onChange={(e) => updateEntryMeal(entry.id, "Lunch", e.target.value)}
                        className="h-8 text-center px-1"
                      />
                    </div>
                  )}
                  {visibleMeals.Dinner && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase text-center">D</span>
                      <Input 
                        type="number" 
                        min="0"
                        step="0.5"
                        value={entry.meals.Dinner}
                        onChange={(e) => updateEntryMeal(entry.id, "Dinner", e.target.value)}
                        className="h-8 text-center px-1"
                      />
                    </div>
                  )}
                  {visibleMeals.Guest && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase text-center">G</span>
                      <Input 
                        type="number" 
                        min="0"
                        step="1"
                        value={entry.meals.Guest}
                        onChange={(e) => updateEntryMeal(entry.id, "Guest", e.target.value)}
                        className="h-8 text-center px-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
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
            loadingText="Logging..."
          >
            <Save /> Save Records
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

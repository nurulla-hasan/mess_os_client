"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IMemberOption } from "@/types/member.type";
import { IMealBreakdown } from "@/types/meal.type";

interface MealEntry {
  id: string; 
  messMemberId: string;
  meals: IMealBreakdown;
}

interface MealEntryRowProps {
  entry: MealEntry;
  members: IMemberOption[];
  visibleMeals: Record<string, boolean>;
  activeCount: number;
  canRemove: boolean;
  onRemove: (id: string) => void;
  onUpdateMember: (id: string, memberId: string) => void;
  onUpdateMeal: (id: string, type: keyof IMealBreakdown, value: string) => void;
}

export const MealEntryRow = React.memo(({ 
  entry, 
  members, 
  visibleMeals, 
  activeCount, 
  canRemove, 
  onRemove, 
  onUpdateMember, 
  onUpdateMeal 
}: MealEntryRowProps) => {
  return (
    <div className="flex flex-col gap-3 p-3 rounded-lg border bg-muted relative animate-in fade-in slide-in-from-top-1 duration-200">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-6 w-6 absolute top-2 right-2 text-muted-foreground hover:text-destructive transition-colors"
        onClick={() => onRemove(entry.id)}
        disabled={!canRemove}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>

      <div className="w-full pr-8">
        <Select 
          value={entry.messMemberId} 
          onValueChange={(val) => onUpdateMember(entry.id, val)}
        >
          <SelectTrigger className="h-8 bg-background/50">
            <SelectValue placeholder="Select Member" />
          </SelectTrigger>
          <SelectContent>
            {members.map((m) => (
              <SelectItem key={m._id} value={m._id} className="text-xs">
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div 
        className="grid gap-2" 
        style={{ gridTemplateColumns: `repeat(${activeCount}, minmax(0, 1fr))` }}
      >
        {Object.entries(visibleMeals).map(([cat, isVisible]) => (
          isVisible && (
            <div key={cat} className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase text-center tracking-tighter">
                {cat.charAt(0)}
              </span>
              <Input 
                type="number" 
                min="0"
                step={cat === "Guest" ? "1" : "0.5"}
                value={entry.meals[cat as keyof IMealBreakdown]}
                onChange={(e) => onUpdateMeal(entry.id, cat as keyof IMealBreakdown, e.target.value)}
                className="h-8 text-center px-1 bg-background/50 focus:bg-background transition-colors"
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
});

MealEntryRow.displayName = "MealEntryRow";

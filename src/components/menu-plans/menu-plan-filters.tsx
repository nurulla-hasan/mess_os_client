"use client";

import { useSmartFilter } from "@/hooks/useSmartFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MenuPlanFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <Select 
        value={statusFilter} 
        onValueChange={(val) => updateFilter("status", val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full sm:w-44">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="published">Published Only</SelectItem>
          <SelectItem value="draft">Drafts Only</SelectItem>
          <SelectItem value="archived">Archived Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

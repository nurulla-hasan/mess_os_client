"use client";

import React from "react";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface MenuPlanFiltersProps {
  showStatus?: boolean;
}

export function MenuPlanFilters({ showStatus = true }: MenuPlanFiltersProps) {
  const { getFilter, updateBatch } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");
  const startDate = getFilter("startDate", "");
  const endDate = getFilter("endDate", "");

  // Convert URL strings back to Date objects for the picker
  const dateRange: DateRange | undefined = React.useMemo(() => {
    const from = startDate ? new Date(startDate) : undefined;
    const to = endDate ? new Date(endDate) : undefined;
    
    if (!from && !to) return undefined;
    return { from, to };
  }, [startDate, endDate]);

  const handleDateChange = (range: DateRange | undefined) => {
    updateBatch({
      startDate: range?.from ? format(range.from, "yyyy-MM-dd") : null,
      endDate: range?.to ? format(range.to, "yyyy-MM-dd") : null,
    });
  };

  return (
    <div className="contents sm:flex sm:flex-row sm:items-center sm:gap-3 sm:w-auto">
      <DatePickerWithRange 
        date={dateRange} 
        setDate={handleDateChange} 
        placeholder="Filter by date range"
        className="w-full sm:w-64"
      />

      {showStatus && (
        <Select 
          value={statusFilter} 
          onValueChange={(val) => updateBatch({ status: val === "all" ? null : val })}
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
      )}
    </div>
  );
}

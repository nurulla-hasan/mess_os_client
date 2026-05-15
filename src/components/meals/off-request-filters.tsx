"use client";

import React from "react";
import { SearchInput } from "@/components/ui/custom/search-input";
import { format } from "date-fns";
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

export function OffRequestFilters() {
  const { getFilter, updateFilter, updateBatch } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");
  const startDate = getFilter("startDate");
  const endDate = getFilter("endDate");

  const dateRange: DateRange | undefined = React.useMemo(() => {
    if (!startDate) return undefined;
    return {
      from: new Date(startDate),
      to: endDate ? new Date(endDate) : undefined,
    };
  }, [startDate, endDate]);

  const handleDateChange = (range: DateRange | undefined) => {
    if (!range) {
      updateBatch({ startDate: null, endDate: null });
      return;
    }

    updateBatch({
      startDate: range.from ? format(range.from, "yyyy-MM-dd") : null,
      endDate: range.to ? format(range.to, "yyyy-MM-dd") : null,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
      <div className="w-full sm:w-64">
        <DatePickerWithRange 
          date={dateRange} 
          setDate={handleDateChange} 
          placeholder="Filter by dates"
        />
      </div>

      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search member..." 
      />
      
      <Select 
        value={statusFilter} 
        onValueChange={(val) => updateFilter("status", val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full xl:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Requests</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

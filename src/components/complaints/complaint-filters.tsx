"use client";

import { useSmartFilter } from "@/hooks/useSmartFilter";
import { SearchInput } from "@/components/ui/custom/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ComplaintFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  const statusValue = getFilter("status", "all");

  return (
    <div className="contents sm:flex sm:flex-row sm:items-center sm:gap-3 sm:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search complaints..." 
        className="col-span-2"
      />

      <Select
        value={statusValue}
        onValueChange={(val) => updateFilter("status", val)}
      >
        <SelectTrigger className="col-span-2 w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

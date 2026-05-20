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

export function NoticeFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  const statusValue = getFilter("status", "all");

  return (
    <div className="contents sm:flex sm:flex-row sm:items-center sm:gap-3 sm:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search notices..." 
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
          <SelectItem value="all">All Notices</SelectItem>
          <SelectItem value="active">Active Notices</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

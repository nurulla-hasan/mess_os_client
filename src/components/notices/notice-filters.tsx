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
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search notices..." 
      />

      <Select
        value={statusValue}
        onValueChange={(val) => updateFilter("status", val)}
      >
        <SelectTrigger className="w-full sm:w-40">
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

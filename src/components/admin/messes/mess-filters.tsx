"use client";

import { SearchInput } from "@/components/ui/custom/search-input";
import { useSmartFilter } from "@/hooks/useSmartFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MessFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search messes..." 
      />
      
      <Select 
        value={statusFilter} 
        onValueChange={(val) => updateFilter("status", val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full xl:w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

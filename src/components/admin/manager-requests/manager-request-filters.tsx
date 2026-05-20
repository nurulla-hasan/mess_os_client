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

export function ManagerRequestFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");

  return (
    <div className="contents sm:flex sm:flex-row sm:items-center sm:gap-3 sm:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search user or reason..." 
        className="col-span-2"
      />
      
      <Select 
        value={statusFilter} 
        onValueChange={(val) => updateFilter("status", val === "all" ? null : val)}
      >
        <SelectTrigger className="col-span-2 w-full xl:w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

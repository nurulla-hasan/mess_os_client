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

export function MemberFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search members..." 
      />
      
      <Select 
        value={statusFilter} 
        onValueChange={(val) => updateFilter("status", val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="removed">Removed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

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

export function SubscriptionHistoryFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  
  const statusFilter = getFilter("status", "all");
  const planFilter = getFilter("planId", "all");

  return (
    <div className="contents sm:flex sm:flex-row sm:items-center sm:gap-3 sm:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search Mess, Manager or Plan..." 
        className="col-span-2"
      />
      
      <Select 
        value={planFilter} 
        onValueChange={(val) => updateFilter("planId", val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full xl:w-40">
          <SelectValue placeholder="All Plans" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Plans</SelectItem>
          <SelectItem value="free">Free Plan</SelectItem>
          <SelectItem value="pro">Pro Plan</SelectItem>
          <SelectItem value="max">Max Plan</SelectItem>
        </SelectContent>
      </Select>

      <Select 
        value={statusFilter} 
        onValueChange={(val) => updateFilter("status", val === "all" ? null : val)}
      >
        <SelectTrigger className="w-full xl:w-40">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="past_due">Past Due</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

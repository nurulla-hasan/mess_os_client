"use client";

import { SearchInput } from "@/components/ui/custom/search-input";

export function UserFilters() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <SearchInput 
        filterKey="searchTerm" 
        placeholder="Search users..." 
      />
    </div>
  );
}

"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSmartFilter } from "@/hooks/useSmartFilter";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  filterKey?: string;
  debounce?: number;
}

export function SearchInput({
  filterKey = "searchTerm",
  debounce = 300,
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const { getFilter, updateFilter } = useSmartFilter();
  const filterValue = getFilter(filterKey);
  const [search, setSearch] = React.useState(filterValue);

  // Sync state if URL changes externally
  React.useEffect(() => {
    setSearch(filterValue);
  }, [filterValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    updateFilter(filterKey, value, { debounce });
  };

  return (
    <div className={cn("relative w-full md:max-w-64", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="pl-10"
        {...props}
      />
    </div>
  );
}

"use client";

import { useSmartFilter } from "@/hooks/useSmartFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AiShoppingFilters() {
  const { getFilter, updateFilter } = useSmartFilter();
  const currentStatus = getFilter("status", "all");

  const handleStatusChange = (value: string) => {
    updateFilter("status", value === "all" ? null : value);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <Select value={currentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="converted">Converted</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

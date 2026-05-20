"use client";

import { useSmartFilter } from "@/hooks/useSmartFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MarketScheduleFilters() {
  const { getFilter, updateFilter } = useSmartFilter();

  const currentStatus = getFilter("status", "all");

  const handleStatusChange = (value: string) => {
    updateFilter("status", value === "all" ? null : value);
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <Select value={currentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-37.5">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="void">Voided</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

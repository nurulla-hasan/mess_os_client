"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSmartFilter } from "@/hooks/useSmartFilter";

export function PaymentFilters() {
  const { getFilter, updateFilter } = useSmartFilter();

  return (
    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
      <Select
        value={getFilter("status", "all")}
        onValueChange={(value) => updateFilter("status", value === "all" ? null : value)}
      >
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

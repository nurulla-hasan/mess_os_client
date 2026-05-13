"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useSmartFilter } from "@/hooks/useSmartFilter";

export function PaymentFilters() {
  const { getFilter, updateFilter, clearAll, isFilterActive } = useSmartFilter();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={getFilter("status", "all")}
        onValueChange={(value) => updateFilter("status", value === "all" ? null : value)}
      >
        <SelectTrigger className="w-[150px]">
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

      {isFilterActive() && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => clearAll()}
          className="h-10 px-3 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}

"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSmartFilter } from "@/hooks/useSmartFilter";

export function ExpenseFilters() {
  const { getFilter, updateFilter } = useSmartFilter();

  return (
    <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-3">
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

      <Select
        value={getFilter("fundSource", "all")}
        onValueChange={(value) => updateFilter("fundSource", value === "all" ? null : value)}
      >
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Fund Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="mess_cash">Mess Cash</SelectItem>
          <SelectItem value="personal_cash">Personal Cash</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

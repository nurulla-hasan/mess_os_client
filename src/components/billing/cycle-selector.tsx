"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { IBillingCycle } from "@/types/billing.type";
import { format } from "date-fns";

interface CycleSelectorProps {
  cycles: IBillingCycle[];
  selectedId: string;
}

export function CycleSelector({ cycles, selectedId }: CycleSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cycleId", val);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={selectedId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-56 shadow-sm">
        <Calendar className="mr-2 h-4 w-4 text-primary" />
        <SelectValue placeholder="Select Cycle" />
      </SelectTrigger>
      <SelectContent>
        {cycles.map((cycle) => (
          <SelectItem key={cycle._id} value={cycle._id}>
            {format(new Date(cycle.year, cycle.month - 1), "MMMM yyyy")} 
            <span className="ml-2 text-xs text-muted-foreground uppercase">
              ({cycle.status})
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

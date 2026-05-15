"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBillingCycle } from "@/types/billing.type";
import { format } from "date-fns";

interface CycleSelectorProps {
  cycles: IBillingCycle[];
  initialId: string;
}

export function CycleSelector({ cycles, initialId }: CycleSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cycleId", val);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={initialId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full shadow-sm bg-background">
        <SelectValue placeholder="Select Cycle" />
      </SelectTrigger>
      <SelectContent>
        {cycles.map((cycle) => (
          <SelectItem key={cycle._id} value={cycle._id}>
            <div className="flex items-center justify-between gap-4 w-full">
              <span>{format(new Date(cycle.year, cycle.month - 1), "MMMM yyyy")}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted">
                {cycle.status}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface HistoryToggleProps {
  isHistory: boolean;
}

export function HistoryToggle({ isHistory }: HistoryToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("history", "true");
    } else {
      params.delete("history");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg border">
      <Switch 
        id="history-mode" 
        checked={isHistory} 
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="history-mode" className="text-xs font-bold uppercase cursor-pointer select-none">
        Include History
      </Label>
    </div>
  );
}

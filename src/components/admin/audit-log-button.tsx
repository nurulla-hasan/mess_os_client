"use client";

import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import { InfoToast } from "@/lib/utils";

export function AuditLogButton() {
  return (
    <Button 
      variant="outline" 
      className="w-full justify-start text-xs font-bold bg-background cursor-not-allowed opacity-70"
      onClick={() => InfoToast("Audit Logging system is under development. Coming soon!")}
    >
      <History className="mr-2 h-4 w-4" /> View Audit Logs
      <span className="ml-auto text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercaseer font-bold">Soon</span>
    </Button>
  );
}

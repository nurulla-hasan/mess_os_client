
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subValue: string;
  variant?: "default" | "info" | "warning" | "success";
}

export function SummaryCard({ 
  icon: Icon, 
  label, 
  value, 
  subValue,
  variant = "default" 
}: SummaryCardProps) {
  const colors = {
    default: "bg-muted text-muted-foreground",
    info: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20"
  };

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {label}
            </p>
            <h4 className="text-2xl font-bold tracking-tight text-foreground">
              {value}
            </h4>
            <p className="text-[10px] font-medium text-muted-foreground uppercase">
              {subValue}
            </p>
          </div>
          <div className={cn("p-2 rounded-lg border", colors[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

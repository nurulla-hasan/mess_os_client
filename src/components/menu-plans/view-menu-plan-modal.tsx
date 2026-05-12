"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IMenuPlan } from "@/types/menu-plan.type";
import {
  Calendar,
  Sparkles,
  User,
  Hash,
  Eye,
  UtensilsCrossed,
  LucideIcon,
  Clock,
  Utensils,
} from "lucide-react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface ViewMenuPlanModalProps {
  plan: IMenuPlan;
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number | undefined;
  subValue?: string;
}

const DetailItem = ({
  icon: Icon,
  label,
  value,
  subValue,
}: DetailItemProps) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-muted">
    <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center text-muted-foreground border shrink-0">
      <Icon className="h-4 w-4" />
    </div>
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-sm font-bold text-foreground truncate">
        {value || "N/A"}
      </span>
      {subValue && (
        <span className="text-xs text-muted-foreground truncate">
          {subValue}
        </span>
      )}
    </div>
  </div>
);

export function ViewMenuPlanModal({ plan }: ViewMenuPlanModalProps) {
  const [open, setOpen] = useState(false);
  const mealEntries = Object.entries(plan.meals);

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Menu Plan Details"
      description="Detailed overview of the scheduled meal menu."
      showClose
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
    >
      <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4 border-b border-muted/20">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
              <UtensilsCrossed className="h-6 w-6" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-lg font-bold leading-none">
                {formatDate(plan.date)}
              </h3>
              <div className="flex gap-3 items-center">
                <Badge
                  variant={
                    plan.status === "published"
                      ? "active"
                      : plan.status === "archived"
                        ? "blocked"
                        : "pending"
                  }
                  className="px-2 h-5 text-xs font-bold"
                >
                  {plan.status.toUpperCase()}
                </Badge>
                {plan.isAiGenerated && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
                    <Sparkles className="h-3 w-3" />
                    <span>AI OPTIMIZED</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {plan.isAiGenerated && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/5 border border-sky-500/10 transition-colors lg:mt-0">
              <div className="h-8 w-8 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600/80 dark:text-sky-400/80 leading-none mb-1">
                  AI Optimization
                </span>
                <p className="text-xs font-medium text-foreground/80">
                  This menu was generated using AI.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DetailItem
            icon={Calendar}
            label="Scheduled"
            value={formatDate(plan.date)}
            subValue="Plan Date"
          />
          <DetailItem
            icon={User}
            label="Created By"
            value="Manager"
            subValue="System User"
          />
          <DetailItem
            icon={Clock}
            label="Last Updated"
            value={formatDate(plan.updatedAt)}
            subValue="Revision Time"
          />
          <DetailItem
            icon={Hash}
            label="Plan ID"
            value={plan._id.substring(0, 8).toUpperCase()}
            subValue="Unique Reference"
          />
        </div>

        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-3">
            <Utensils className="h-4 w-4" /> Meal Menu
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {mealEntries.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center border border-dashed rounded-lg text-muted-foreground italic">
                No items recorded for this plan.
              </div>
            ) : (
              mealEntries.map(([category, content]) => (
                <div
                  key={category}
                  className="flex flex-col p-4 rounded-lg border bg-muted border-muted/20 hover:border-primary/20 transition-all group"
                >
                  <span className="text-xs font-bold text-primary/60 uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">
                    {category}
                  </span>
                  <p className="text-sm font-medium leading-relaxed">
                    {content || (
                      <span className="text-muted-foreground/40 italic">
                        No menu items set
                      </span>
                    )}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

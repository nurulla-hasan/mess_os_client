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
  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-muted">
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
        <Button variant="ghost" size="icon">
          <Eye />
        </Button>
      }
    >
      <div className="p-6">
        <div className="flex items-center gap-4 py-4 border-b">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <UtensilsCrossed className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-bold leading-none">
              {formatDate(plan.date)}
            </h3>
            <div className="flex gap-2 items-center">
              <Badge
                variant={
                  plan.status === "published"
                    ? "active"
                    : plan.status === "archived"
                      ? "blocked"
                      : "pending"
                }
                className="px-2 h-5 text-xs"
              >
                {plan.status.toUpperCase()}
              </Badge>
              {plan.isAiGenerated && (
                <Badge variant="info" className="px-2 h-5 text-xs">
                  AI GEN
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <DetailItem
            icon={Calendar}
            label="Scheduled"
            value={formatDate(plan.date)}
          />
          <DetailItem icon={User} label="Created By" value="Manager" />
          <DetailItem
            icon={Clock}
            label="Last Updated"
            value={formatDate(plan.updatedAt)}
          />
          <DetailItem
            icon={Hash}
            label="Plan ID"
            value={plan._id.slice(-8).toUpperCase()}
          />
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
            Meal Items
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {mealEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground italic p-4 bg-muted/30 rounded-lg border border-dashed text-center">
                No items defined.
              </p>
            ) : (
              mealEntries.map(([category, content]) => (
                <div
                  key={category}
                  className="flex items-start gap-3 p-4 rounded-lg bg-background border shadow-sm group"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <span className="text-xs font-black uppercase">
                      {category.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-bold text-primary uppercase tracking-tighter">
                      {category}
                    </span>
                    <p className="text-sm font-medium text-foreground leading-relaxed">
                      {content || "No menu set"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {plan.isAiGenerated && (
          <div className="mt-4 p-3 rounded-lg bg-sky-50 border border-sky-100 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-sky-600 border shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-tighter">
                AI Optimization
              </span>
              <span className="text-sm font-medium text-sky-900 truncate">
                This menu was generated using AI.
              </span>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}

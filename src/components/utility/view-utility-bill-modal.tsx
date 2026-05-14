"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Calendar, 
  DollarSign, 
  Tag, 
  Info,
  CheckCircle2,
  Clock,
  Zap,
  Droplets,
  Flame,
  Globe,
  Trash2,
  MoreHorizontal,
  LucideIcon
} from "lucide-react";
import { IUtilityBill, UtilityCategory } from "@/types/utility.type";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ViewUtilityBillModalProps {
  bill: IUtilityBill;
}

const categoryIcons: Record<UtilityCategory, LucideIcon> = {
  electricity: Zap,
  water: Droplets,
  gas: Flame,
  internet: Globe,
  trash: Trash2,
  others: MoreHorizontal,
};

const categoryColors: Record<UtilityCategory, string> = {
  electricity: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  water: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  gas: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  internet: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  trash: "text-slate-500 bg-slate-500/10 border-slate-500/20",
  others: "text-muted-foreground bg-muted border-muted-foreground/20",
};

export function ViewUtilityBillModal({ bill }: ViewUtilityBillModalProps) {
  const [open, setOpen] = React.useState(false);
  const Icon = categoryIcons[bill.category] || MoreHorizontal;

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Utility Bill Details"
      description="Detailed information about this utility expenditure."
      actionTrigger={
        <Button 
          variant="outline" 
          size="icon-sm" 
          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </Button>
      }
    >
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className={cn("p-3 rounded-xl border-2 shadow-sm", categoryColors[bill.category])}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold capitalize">{bill.category} Bill</h3>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Reference ID: {bill._id.slice(-8).toUpperCase()}
            </p>
          </div>
          <div className="ml-auto">
            <Badge 
              variant={bill.status === "paid" ? "success" : "pending"}
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm"
            >
              {bill.status === "paid" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
              {bill.status}
            </Badge>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border bg-background flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Amount</span>
            </div>
            <p className="text-xl font-bold text-foreground">৳{bill.amount.toLocaleString()}</p>
          </div>

          <div className="p-4 rounded-xl border bg-background flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Due Date</span>
            </div>
            <p className="text-sm font-bold text-foreground">
              {format(new Date(bill.dueDate), "dd MMMM, yyyy")}
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-background flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Billing Period</span>
            </div>
            <p className="text-sm font-bold text-foreground capitalize">
              {format(new Date(bill.year, bill.billingMonth - 1), "MMMM yyyy")}
            </p>
          </div>

          <div className="p-4 rounded-xl border bg-background flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Info className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Payment Status</span>
            </div>
            <p className={cn(
              "text-sm font-bold capitalize",
              bill.status === "paid" ? "text-emerald-500" : "text-amber-500"
            )}>
              {bill.status === "paid" ? "Settled" : "Awaiting Payment"}
            </p>
          </div>
        </div>

        {/* Timeline/Meta Info */}
        <div className="p-4 rounded-xl border bg-muted/20 text-xs space-y-2">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Created At</span>
            <span className="font-medium text-foreground">{format(new Date(bill.createdAt), "PPP p")}</span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Last Updated</span>
            <span className="font-medium text-foreground">{format(new Date(bill.updatedAt), "PPP p")}</span>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => setOpen(false)} variant="outline" className="px-8">
            Close
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

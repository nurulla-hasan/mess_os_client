"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  ShoppingCart, 
  Users, 
  Calendar,
  Wallet,
  CheckCircle2,
  Clock,
  Ban
} from "lucide-react";
import { IMarketSchedule } from "@/types/market-schedule.type";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ViewMarketScheduleModalProps {
  schedule: IMarketSchedule;
}

export function ViewMarketScheduleModal({ schedule }: ViewMarketScheduleModalProps) {
  const [open, setOpen] = React.useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "void": return <Ban className="h-4 w-4 text-rose-500" />;
      default: return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Bazaar Duty Details"
      description={`Full schedule information for ${format(new Date(schedule.targetDate), "PPP")}`}
      actionTrigger={
        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
          <Eye/>
        </Button>
      }
    >
      <div className="p-6 flex flex-col gap-8">
        {/* Header Info Card */}
        <div className="flex items-start justify-between bg-muted/30 p-4 rounded-xl border border-border/50">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Target Date</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">{format(new Date(schedule.targetDate), "PPPP")}</span>
            </div>
          </div>
          <Badge 
            variant={schedule.status === "completed" ? "success" : schedule.status === "void" ? "rejected" : "pending"}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-tight"
          >
            {getStatusIcon(schedule.status)}
            {schedule.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Assignees */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 px-1">
              <Users className="h-4 w-4 text-primary" /> 
              Assigned Members
            </h3>
            <div className="space-y-3">
              {schedule.assignedTo.map((assignee) => (
                <div 
                  key={assignee._id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/40 hover:border-primary/30 transition-all group"
                >
                  <Avatar className="h-10 w-10 border-2 border-background ring-1 ring-border group-hover:ring-primary/40 transition-all">
                    <AvatarImage src={assignee.user.avatarUrl} />
                    <AvatarFallback className="bg-primary/5 text-primary font-bold">
                      {assignee.user.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold leading-none">{assignee.user.fullName}</span>
                    <span className="text-[10px] text-muted-foreground mt-1 capitalize">{assignee.messRole}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Shopping List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold flex items-center gap-2 px-1">
              <ShoppingCart className="h-4 w-4 text-primary" /> 
              Shopping Items
            </h3>
            <div className="rounded-xl border bg-muted/10 overflow-hidden">
              <ScrollArea className="h-60">
                <div className="divide-y divide-border/40">
                  {schedule.shoppingItems.map((item, index) => (
                    <div key={index} className="p-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <span className="text-sm font-medium">{item.name}</span>
                      <Badge variant="secondary" className="font-mono text-[11px] bg-background border-none shadow-sm">
                        {item.quantity}
                      </Badge>
                    </div>
                  ))}
                  {schedule.shoppingItems.length === 0 && (
                    <div className="p-10 text-center text-muted-foreground text-sm">
                      No items listed for this duty.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <Separator className="bg-border/40" />

        {/* Footer: Budget Info */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Estimated Budget</p>
              <p className="text-xl font-black text-primary tracking-tight">
                ৳{schedule.estimatedBudget?.toLocaleString()}
              </p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Close View
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

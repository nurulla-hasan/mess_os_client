"use client";

import React from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  ShoppingCart, 
  Users, 
  Calendar,
  Wallet
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

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Bazaar Duty Details"
      description={`Schedule information for ${format(new Date(schedule.targetDate), "PPP")}`}
      actionTrigger={
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      }
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{format(new Date(schedule.targetDate), "PPP")}</span>
          </div>
          <Badge 
            variant={schedule.status === "completed" ? "success" : schedule.status === "void" ? "rejected" : "pending"}
            className="capitalize"
          >
            {schedule.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assignees */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-3">
              <Users className="h-4 w-4" /> Assigned Members
            </h3>
            <div className="space-y-2">
              {schedule.assignedTo.map((assignee) => (
                <div key={assignee._id} className="flex items-center gap-3 p-2 rounded-md border text-sm">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={assignee.user.avatarUrl} />
                    <AvatarFallback>{assignee.user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <span>{assignee.user.fullName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-3">
              <ShoppingCart className="h-4 w-4" /> Shopping Items
            </h3>
            <div className="rounded-md border">
              <ScrollArea className="h-50">
                <div className="divide-y">
                  {schedule.shoppingItems.map((item, index) => (
                    <div key={index} className="p-2 flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span>Estimated Budget</span>
          </div>
          <span className="font-bold">৳{schedule.estimatedBudget}</span>
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}

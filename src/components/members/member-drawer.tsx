"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ActiveMember } from "./columns";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  Utensils, 
  TrendingUp, 
  AlertCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface MemberDrawerProps {
  member: ActiveMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberDrawer({ member, isOpen, onClose }: MemberDrawerProps) {
  if (!member) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl w-full p-0 flex flex-col">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {member.name.charAt(0)}
            </div>
            <div>
              <SheetTitle className="text-2xl font-bold">{member.name}</SheetTitle>
              <SheetDescription className="flex items-center gap-2 mt-1">
                <Badge variant={member.role === "manager" ? "manager" : "member"}>
                  {member.role}
                </Badge>
                <Badge variant={member.status === "active" ? "active" : "blocked"}>
                  {member.status}
                </Badge>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-8 py-6">
            {/* Personal Information */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{member.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium italic">Joined on {format(new Date(member.joinedDate), "PPP")}</span>
                </div>
              </div>
            </section>

            <Separator />

            {/* Mess Stats Summary */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Mess Operations</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Utensils className="h-4 w-4" />
                    <span className="text-xs font-medium">Total Meals</span>
                  </div>
                  <p className="text-2xl font-bold">124</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-xs font-medium">Balance</span>
                  </div>
                  <p className={`text-2xl font-bold ${member.dueAmount > 0 ? "text-rose-500" : "text-emerald-500"}`}>
                    ৳{member.advanceAmount - member.dueAmount}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {member.dueAmount > 0 ? "Outstanding due" : "Advance available"}
                  </p>
                </div>
              </div>
            </section>

            {/* Detailed Summaries */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Expense Summary</span>
                </div>
                <span className="text-sm font-bold">৳4,500</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold">Open Complaints</span>
                </div>
                <span className="text-sm font-bold">0</span>
              </div>
            </section>

            <Separator />

            {/* Activity Timeline */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Activity Timeline</h3>
              <div className="space-y-6 relative before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/20">
                    <Clock className="h-3 w-3 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium">Paid ৳1,500 for monthly deposit</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Today at 10:45 AM</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                    <Utensils className="h-3 w-3 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium">Updated meal status to OFF</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Yesterday at 9:00 PM</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Member profile updated</p>
                  <p className="text-xs text-muted-foreground mt-0.5">3 days ago</p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

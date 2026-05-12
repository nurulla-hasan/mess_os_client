"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays } from "date-fns";
import { IMealOffRequest } from "@/types/meal-off-request.type";
import {
  Calendar,
  MessageSquare,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ViewOffRequestModalProps {
  request: IMealOffRequest;
}

interface DetailItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number | undefined;
  subValue?: string;
  variant?: "default" | "warning" | "success" | "info";
}

const DetailItem = ({
  icon: Icon,
  label,
  value,
  subValue,
  variant = "default",
}: DetailItemProps) => {
  const getIconColor = () => {
    switch (variant) {
      case "warning": return "text-amber-600 dark:text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "success": return "text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "info": return "text-blue-600 dark:text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-muted-foreground bg-muted border-muted/50";
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted border border-muted/50">
      <div className={`h-8 w-8 rounded-full flex items-center justify-center border shrink-0 ${getIconColor()}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <span className="text-sm font-bold text-foreground truncate">
          {value || "Not provided"}
        </span>
        {subValue && (
          <span className="text-xs text-muted-foreground font-medium truncate">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
};

export function ViewOffRequestModal({ request }: ViewOffRequestModalProps) {
  const [open, setOpen] = React.useState(false);
  const user = request.messMemberId.user;
  const start = new Date(request.startDate);
  const end = new Date(request.endDate);
  const days = differenceInDays(end, start) + 1;

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Meal Off Request Details"
      description="Detailed view of the member's meal suspension request."
      showClose
      actionTrigger={
        <Button
          variant="outline"
          size="icon-sm"
          className="text-muted-foreground"
        >
          <Eye />
        </Button>
      }
    >
      <div className="p-0">
        {/* Header Profile Section */}
        {/* Compact Header Section */}
        <div className="flex items-center gap-5 p-5 bg-muted dark:bg-muted border-b">
          <Avatar className="h-14 w-14 border border-primary/10 shadow-sm">
            <AvatarImage src={user.avatarUrl} alt={user.fullName} />
            <AvatarFallback className="bg-primary/5 text-primary text-xl font-bold">
              {user.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <h3 className="text-lg font-bold text-foreground truncate">{user.fullName}</h3>
              <Badge
                variant={
                  request.status === "approved"
                    ? "active"
                    : request.status === "rejected"
                      ? "rejected"
                      : "pending"
                }
                className="px-2.5 py-0 font-bold text-xs uppercase tracking-wider h-5"
              >
                {request.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem
              icon={Calendar}
              label="Start Date"
              value={format(start, "PPP")}
              subValue="Meal stop from"
            />
            <DetailItem
              icon={Calendar}
              label="End Date"
              value={format(end, "PPP")}
              subValue="Meal resume from"
            />
            <DetailItem
              icon={Clock}
              label="Total Duration"
              value={`${days} ${days === 1 ? "Day" : "Days"}`}
              subValue="Suspension period"
              variant="info"
            />
            <DetailItem
              icon={MessageSquare}
              label="Submission"
              value={format(new Date(request.createdAt), "MMM dd, hh:mm a")}
              subValue="Date of request"
            />
          </div>

          {/* Reason Section */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 space-y-2">
            <div className="flex items-center gap-3 text-xs font-bold text-primary uppercase tracking-[0.2em]">
              <MessageSquare className="h-3 w-3" />
              Member&apos;s Reason
            </div>
            <p className="text-sm leading-relaxed text-foreground font-medium italic">
              &quot;{request.reason || "No reason provided by the member."}&quot;
            </p>
          </div>

          {/* Reviewer Section */}
          {request.status !== "pending" && (
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted dark:bg-muted border border-muted/50">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 border ${
                  request.status === 'approved' 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/20'
                }`}>
                  {request.status === 'approved' ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Review Information
                  </span>
                  <div className="flex items-center gap-1 flex-wrap mt-0.5">
                    <span className="text-sm font-bold text-foreground">
                      {request.status === 'approved' ? 'Approved' : 'Rejected'} by {request.reviewedBy?.fullName || "Manager"}
                    </span>
                    {request.reviewedAt && (
                      <span className="text-xs text-muted-foreground">
                        on {format(new Date(request.reviewedAt), "MMM dd, yyyy")}
                      </span>
                    )}
                  </div>
                  {request.adminNote && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic">
                      &quot;{request.adminNote}&quot;
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

"use client";

import React from "react";
import { IManagerRequest } from "@/types/manager-request.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar,
  User as UserIcon,
  MessageSquareQuote
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/user.type";

interface ManagerRequestCardProps {
  request: IManagerRequest;
}

export function ManagerRequestCard({ request }: ManagerRequestCardProps) {
  const user = request.userId as IUser;
  const status = request.status;

  const statusConfig = {
    pending: { class: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Pending" },
    approved: { class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", label: "Approved" },
    rejected: { class: "bg-destructive/10 text-destructive border-destructive/20", label: "Rejected" },
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 border-primary/10">
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        status === "pending" ? "bg-amber-500" : status === "approved" ? "bg-emerald-500" : "bg-destructive"
      )} />
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* User Info */}
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <UserIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg leading-none">{user.fullName}</h3>
                <Badge variant="outline" className={cn("text-[10px] uppercase font-black px-2 py-0", statusConfig[status].class)}>
                  {statusConfig[status].label}
                </Badge>
              </div>
              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date Info */}
          <div className="flex flex-col md:items-end justify-center text-sm text-muted-foreground gap-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Requested: {format(new Date(request.createdAt), "MMM dd, yyyy")}</span>
            </div>
            {status !== "pending" && (
              <span className="text-[10px] uppercase font-bold tracking-wider">
                Updated: {format(new Date(request.updatedAt), "MMM dd, yyyy")}
              </span>
            )}
          </div>
        </div>

        {/* Reason Section */}
        <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/50 relative">
          <MessageSquareQuote className="absolute -top-3 left-4 h-6 w-6 text-muted-foreground/20 rotate-12" />
          <p className="text-sm italic leading-relaxed text-foreground/80 pl-2">
            &quot;{request.reason}&quot;
          </p>
        </div>

        {/* Actions */}
        {status === "pending" && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 gap-2 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="h-4 w-4" />
              Approve Request
            </Button>
            <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/5 hover:text-destructive gap-2 border-destructive/20">
              <XCircle className="h-4 w-4" />
              Reject Request
            </Button>
            <Button size="sm" variant="ghost" className="text-muted-foreground ml-auto">
              View Profile
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

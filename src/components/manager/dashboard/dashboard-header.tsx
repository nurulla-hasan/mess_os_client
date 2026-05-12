"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IMess } from "@/types/mess.type";
import { ISubscriptionInfo } from "@/types/dashboard.type";
import { 
  Settings, 
  MapPin, 
  Calendar, 
  Copy, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { SuccessToast, formatDate } from "@/lib/utils";
import Link from "next/link";

interface DashboardHeaderProps {
  mess: IMess;
  subscription: ISubscriptionInfo;
}

export function DashboardHeader({ mess, subscription }: DashboardHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyInviteCode = () => {
    navigator.clipboard.writeText(mess.inviteCode);
    setCopied(true);
    SuccessToast("Invite code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          {/* Left: Mess Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{mess.name}</h1>
              <Badge variant={mess.status === "active" ? "active" : "blocked"}>
                {mess.status === "active" ? (
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                )}
                {mess.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary/60" />
                {mess.address}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary/60" />
                Started {formatDate(mess.createdAt)}
              </div>
            </div>
          </div>

          {/* Right: Subscription & Invite */}
          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <div className="bg-muted border px-3 py-1.5 rounded-lg flex items-center gap-4">
              <div className="space-y-0.5">
                <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Plan</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-primary">{subscription.plan.name}</span>
                  <Badge variant="outline" className="text-xs h-4 px-1 leading-none uppercase font-bold bg-background/50">
                    {subscription.plan.billingCycle}
                  </Badge>
                </div>
              </div>
              <div className="w-px h-6 bg-border/60 mx-1" />
              <div className="space-y-0.5">
                <p className="text-xs uppercase font-bold text-muted-foreground tracking-wider">Invite</p>
                <div className="flex items-center gap-2 group cursor-pointer" onClick={copyInviteCode}>
                  <code className="font-mono font-bold text-sm tracking-widest">{mess.inviteCode}</code>
                  <Copy className={`w-3.5 h-3.5 transition-colors ${copied ? "text-emerald-500" : "text-muted-foreground group-hover:text-primary"}`} />
                </div>
              </div>
            </div>

            <Link href="/manager/mess-settings">
              <Button variant="outline" size="sm" className="h-9 px-4 font-bold transition-all">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

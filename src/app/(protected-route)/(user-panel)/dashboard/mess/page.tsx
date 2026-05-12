"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  MapPin, 
  Users, 
  Utensils, 
  Info,
  ShieldCheck,
  Key
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function MemberMessOverviewPage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Mess Overview"
        description="Detailed information about your current mess and operational policies."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-primary" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold">Green House Mess</CardTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> Sector 10, Uttara, Dhaka
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Status</p>
                  <Badge variant="success">ACTIVE</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Members</p>
                  <p className="text-sm font-bold flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> 12 Active Members
                  </p>
                </div>
              </div>
              
              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-bold flex items-center gap-3">
                  <Utensils className="h-4 w-4 text-primary" />
                  Meal Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary">Breakfast</Badge>
                  <Badge variant="secondary">Lunch</Badge>
                  <Badge variant="secondary">Dinner</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Info className="h-4 w-4 text-primary" />
                Operational Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Meal Modification Deadline</span>
                <span className="font-bold">9:00 PM (Previous Day)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Billing Cycle</span>
                <span className="font-bold">Monthly (1st to 30th)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Manager</span>
                <span className="font-bold">Golap Hasan</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Key className="h-4 w-4 text-primary" />
                Mess Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">This is the code required for new members to join this mess.</p>
              <div className="p-3 bg-background border border-dashed border-primary/30 rounded-lg flex items-center justify-center font-mono font-bold tracking-widest text-lg">
                MESS-XYZ-789
              </div>
              <p className="text-xs text-center text-muted-foreground italic">Share this with people you want to invite.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Your Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Badge variant="member" className="w-fit uppercase">Member</Badge>
                <p className="text-xs text-muted-foreground">You have standard access to view meals, submit payments, and track your personal billing.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}


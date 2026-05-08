"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  TrendingUp, 
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminStatsPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Platform Analytics"
          description="In-depth statistics on platform growth, user engagement, and mess activity."
        />
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
                <LineChart className="h-4 w-4" />
                User Acquisition Growth
              </CardTitle>
              <CardDescription>Daily new user registrations over the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-64 flex items-end gap-2 px-6">
              {/* Mock Bar Chart */}
              {[40, 60, 45, 80, 95, 70, 85, 100, 60, 75, 90, 110].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all hover:bg-primary/40" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 10}
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="px-6 pb-6 pt-2 flex justify-between text-xs text-muted-foreground uppercase font-bold tracking-widest">
              <span>May 01</span>
              <span>May 15</span>
              <span>May 30</span>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Mess Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs">Active</span>
                  </div>
                  <span className="text-xs font-bold">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-xs">Pending</span>
                  </div>
                  <span className="text-xs font-bold">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-rose-500" />
                    <span className="text-xs">Suspended</span>
                  </div>
                  <span className="text-xs font-bold">14</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Engagement Rate</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="relative h-24 w-24 flex items-center justify-center">
                   <svg className="h-full w-full -rotate-90">
                     <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                     <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" className="text-primary" />
                   </svg>
                   <span className="absolute text-xl font-black">75%</span>
                </div>
                <p className="text-xs text-muted-foreground uppercase font-bold mt-4 tracking-wider text-center">Daily Active Users</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold">Growth Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">User Retention</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 84%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[84%]" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Premium Conversion</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> 12%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[12%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-6 space-y-2 text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-sm font-bold">System Status: Optimal</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All platform modules are operating within normal parameters. 
                Next scheduled maintenance in 14 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

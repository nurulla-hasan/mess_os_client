import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  TrendingUp, 
  Calendar,
  ShieldCheck,
  Building2,
  Users,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlatformAnalytics } from "@/services/admin.service";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";

export default async function AdminStatsPage() {
  const analyticsRes = await getPlatformAnalytics();
  const data = analyticsRes?.data || {};
  const summary = data.summary || {};
  const trends = data.trends || { dailyNewUsers: [], dailyNewMesses: [] };

  const summaryCards = [
    { title: "Total Users", value: summary.users?.total || 0, active: summary.users?.active || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Active Managers", value: summary.managers?.active || 0, total: summary.managers?.total || 0, icon: UserCheck, color: "text-primary", bg: "bg-primary/10" },
    { title: "Platform Messes", value: summary.messes?.total || 0, active: summary.messes?.active || 0, icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Active Members", value: summary.members?.active || 0, icon: ShieldCheck, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <Card key={i}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{card.title}</p>
                  <p className="text-3xl font-black">{card.value}</p>
                  {card.active !== undefined && (
                    <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                      {card.active} active currently
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${card.bg}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <AnalyticsCharts 
          userTrends={trends.dailyNewUsers} 
          messTrends={trends.dailyNewMesses} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Operational Deep Dive */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Mess Breakdown</CardTitle>
              <CardDescription className="text-xs">Current operational status of all registered messes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-sm">Active Messes</span>
                </div>
                <span className="text-sm font-bold">{summary.messes?.active || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="text-sm">Suspended/Inactive</span>
                </div>
                <span className="text-sm font-bold">{summary.messes?.suspended || 0}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Pending Manager Requests</span>
                  <Badge variant="secondary" className="h-6 px-2 font-mono text-xs">
                    {summary.pendingManagerRequests || 0}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Account Integrity</CardTitle>
              <CardDescription className="text-xs">Security and status overview of platform accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-sm">Active Users</span>
                </div>
                <span className="text-sm font-bold">{summary.users?.active || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-600" />
                  <span className="text-sm">Blocked Accounts</span>
                </div>
                <span className="text-sm font-bold text-rose-600">{summary.users?.blocked || 0}</span>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  * Blocked accounts have restricted access to all platform features until manually restored by a Super Admin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Growth Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Mess Approval Rate</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    {summary.messes?.total ? Math.round((summary.messes.active / summary.messes.total) * 100) : 0}%
                  </span>
                </div>
                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000" 
                    style={{ width: `${summary.messes?.total ? (summary.messes.active / summary.messes.total) * 100 : 0}%` }} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Admin/Manager Ratio</span>
                  <span className="text-primary font-bold flex items-center gap-1">
                    1:{summary.managers?.total ? Math.round(summary.users?.total / summary.managers.total) : 0}
                  </span>
                </div>
                <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-emerald-500/5">
            <CardContent className="p-6 space-y-2 text-center">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold">System Integrity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Platform analytics are synchronized in real-time. 
                All system health checks passed successfully.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

import { Badge } from "@/components/ui/badge";

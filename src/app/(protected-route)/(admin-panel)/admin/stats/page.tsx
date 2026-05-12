import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Calendar,
  ShieldCheck,
  Building2,
  Users,
  UserCheck,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlatformAnalytics } from "@/services/admin.service";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";
import { IPlatformAnalytics } from "@/types/analytics.type";
import { Badge } from "@/components/ui/badge";

export default async function AdminStatsPage() {
  const analyticsRes = await getPlatformAnalytics();
  const data: IPlatformAnalytics | null = analyticsRes?.data;

  if (!data) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <h2 className="text-lg font-semibold">Failed to load analytics</h2>
          <p className="text-sm text-muted-foreground">Please try again later.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const { summary, trends } = data;

  const summaryCards = [
    {
      title: "Total Users",
      value: summary.users.total,
      active: summary.users.active,
      icon: Users,
    },
    {
      title: "Active Managers",
      value: summary.managers.active,
      total: summary.managers.total,
      icon: UserCheck,
    },
    {
      title: "Platform Messes",
      value: summary.messes.total,
      active: summary.messes.active,
      icon: Building2,
    },
    {
      title: "Estimated MRR",
      value: `${summary.subscriptions.estimatedMonthlyRecurringRevenue.toLocaleString()} ${summary.subscriptions.currency}`,
      icon: DollarSign,
    },
  ];

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <DashboardPageHeader
          title="Platform Analytics"
          description="Overview of platform performance and growth metrics."
        />
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.active !== undefined ? (
                  <span className="text-emerald-600 font-medium">{card.active} active</span>
                ) : card.total !== undefined ? (
                  `Out of ${card.total} total`
                ) : (
                  "Monthly recurring revenue"
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className="mb-8">
        <AnalyticsCharts
          userTrends={trends.dailyNewUsers}
          messTrends={trends.dailyNewMesses}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Distribution</CardTitle>
              <CardDescription>Active users across different subscription tiers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summary.subscriptions.byPlan.map((plan) => (
                  <div key={plan.planId} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold">{plan.planName}</p>
                      <p className="text-xs text-muted-foreground">
                        {plan.price} {plan.currency} / {plan.billingCycle}
                      </p>
                    </div>
                    <div className="flex gap-6 text-right">
                      <div>
                        <p className="text-sm font-bold">{plan.count}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Total</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-emerald-600">{plan.active}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Active</p>
                      </div>
                    </div>
                  </div>
                ))}
                {summary.subscriptions.byPlan.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4 text-center">No subscription data available.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Operational Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Member Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold">{summary.members.active}</span>
                  <span className="text-xs text-muted-foreground font-medium">Active Members</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-full" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Mess Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Active ({summary.messes.active})</span>
                    <span>{(summary.messes.active / summary.messes.total * 100 || 0).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500" 
                      style={{ width: `${(summary.messes.active / summary.messes.total * 100) || 0}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System & Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Weekly Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-dashed">
                <span className="text-sm text-muted-foreground">New Subscriptions</span>
                <span className="text-sm font-bold">{summary.subscriptions.recent.subscribedLast7Days}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed">
                <span className="text-sm text-muted-foreground">Failed Payments</span>
                <span className={`text-sm font-bold ${summary.subscriptions.recent.paymentFailedLast7Days > 0 ? "text-destructive" : ""}`}>
                  {summary.subscriptions.recent.paymentFailedLast7Days}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Pending Requests</span>
                <Badge variant="outline">{summary.pendingManagerRequests}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Platform Integrity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Blocked Accounts</span>
                <span className="text-sm font-bold text-destructive">{summary.users.blocked}</span>
              </div>
              <div className="p-3 bg-muted rounded-lg border flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold">System Operational</p>
                  <p className="text-[10px] text-muted-foreground">All checks passed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

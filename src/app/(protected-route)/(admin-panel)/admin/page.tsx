import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  ShieldAlert, 
  TrendingUp, 
  ArrowUpRight,
  UserPlus,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import { getPlatformStats, getAllMesses } from "@/services/admin.service";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns as messColumns } from "@/components/admin/messes/columns";
import { AuditLogButton } from "@/components/admin/audit-log-button";

export default async function AdminDashboardPage() {
  const [statsResponse, messesResponse] = await Promise.all([
    getPlatformStats(),
    getAllMesses({ limit: "5" }),
  ]);

  const platformStats = statsResponse?.data || {};
  const recentMesses = messesResponse?.data || [];


  const stats = [
    { 
      title: "Total Users", 
      value: platformStats.totalUsers || "0", 
      icon: Users, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10", 
      trend: "Overall" 
    },
    { 
      title: "Total Messes", 
      value: platformStats.totalMesses || "0", 
      icon: Building2, 
      color: "text-primary", 
      bg: "bg-primary/10", 
      trend: "Platform wide" 
    },
    { 
      title: "Active Messes", 
      value: platformStats.activeMesses || "0", 
      icon: ShieldCheck, 
      color: "text-emerald-500", 
      bg: "bg-emerald-500/10", 
      trend: `${platformStats.totalMesses ? Math.round((platformStats.activeMesses / platformStats.totalMesses) * 100) : 0}% active` 
    },
    { 
      title: "Suspended", 
      value: platformStats.suspendedMesses || "0", 
      icon: ShieldAlert, 
      color: "text-rose-500", 
      bg: "bg-rose-500/10", 
      trend: "Action required" 
    },
  ];

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Super Admin Overview"
          description="Global platform statistics and system monitoring dashboard."
        />
        <div className="flex gap-2">
          <Link href="/admin/stats">
            <Button variant="outline" size="sm">
              <TrendingUp /> Full Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> {stat.trend} this month
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Messes */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Recent Mess Onboarding
              </CardTitle>
              <CardDescription>New messes registered in the last 7 days.</CardDescription>
            </div>
            <Link href="/admin/messes">
              <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={messColumns} 
              data={recentMesses} 
            />
          </CardContent>
        </Card>

        {/* Quick Actions / System Health */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Platform Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/admin/users">
                <Button variant="outline" className="w-full justify-start text-xs font-bold bg-background">
                  <UserPlus className="mr-2 h-4 w-4" /> Manage Platform Users
                </Button>
              </Link>
              <Link href="/admin/subscriptions/history">
                <Button variant="outline" className="w-full justify-start text-xs font-bold bg-background">
                  <CreditCard className="mr-2 h-4 w-4" /> Subscriptions & Revenue
                </Button>
              </Link>
              <AuditLogButton />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold">Server Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">API Status</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Database Latency</span>
                <span className="font-bold">24ms</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
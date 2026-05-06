"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Utensils,
  Wallet,
  UserPlus,
  TrendingUp,
  Plus,
  CheckCircle,
  FileText,
  Settings,
  ArrowRight,
  Clock,
  Bell,
  CreditCard,
  Building2,
  Copy,
  Receipt,
  AlertTriangle,
  Zap,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/ui/custom/page-header";

// Mock Data for the Dashboard
const summaryMetrics = [
  { label: "Active Members", value: "18", icon: Users, variant: "member" as const, note: "2 pending join requests" },
  { label: "Today's Meals", value: "24", icon: Utensils, variant: "processing" as const, note: "Breakfast: 8, Lunch: 16" },
  { label: "Pending Payments", value: "৳4,500", icon: Wallet, variant: "pending" as const, note: "5 members haven't paid" },
  { label: "Monthly Expenses", value: "৳12,850", icon: TrendingUp, variant: "active" as const, note: "Current month bazaar" },
  { label: "Pending Expenses", value: "৳1,200", icon: Receipt, variant: "warning" as const, note: "3 bazaar entries pending" },
  { label: "Unpaid Utilities", value: "2", icon: Zap, variant: "blocked" as const, note: "Electricity & Water" },
  { label: "Open Complaints", value: "1", icon: AlertTriangle, variant: "rejected" as const, note: "Kitchen tap leaking" },
  { label: "Join Requests", value: "3", icon: UserPlus, variant: "info" as const, note: "Waiting for review" },
];

const quickOperations = [
  { label: "Approvals", icon: CheckCircle, href: "/manager/members", count: 3, variant: "outline" as const },
  { label: "Billing", icon: CreditCard, href: "/manager/billing", variant: "outline" as const },
  { label: "Meals", icon: Utensils, href: "/manager/meals", variant: "outline" as const },
  { label: "Notices", icon: FileText, href: "/manager/notices", variant: "outline" as const },
  { label: "Market", icon: ShoppingCart, href: "/manager/market-schedules", variant: "outline" as const },
];

const recentActivity = [
  { id: 1, type: "financial", title: "Bazaar Expense Added", user: "Rahim Uddin", amount: "৳2,400", time: "10 mins ago", status: "processing" as const },
  { id: 2, type: "operational", title: "New Join Request", user: "Tanvir Hasan", detail: "Wants to join Sunrise Mess", time: "1 hour ago", status: "pending" as const },
  { id: 3, type: "financial", title: "Deposit Approved", user: "Saiful Islam", amount: "৳5,000", time: "3 hours ago", status: "active" as const },
  { id: 4, type: "operational", title: "Notice Posted", user: "Manager", detail: "Monthly meeting on Friday", time: "5 hours ago", status: "completed" as const },
];

export default function ManagerDashboardPage() {
  const router = useRouter();

  const copyInviteCode = () => {
    navigator.clipboard.writeText("SUNRISE-2024");
    toast.success("Invite code copied to clipboard!");
  };

  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Manager Dashboard"
        description="Overview of your mess operations and pending management tasks"
      />

      <div className="space-y-6">
        {/* Hero Section */}
        <Card className="relative overflow-hidden border-none bg-linear-to-br from-primary/10 via-background to-background ring-1 ring-primary/20">
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">Sunrise Mess</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="active" className="px-3 py-1">Active Now</Badge>
                  <Badge variant="secondary" className="px-3 py-1 font-medium">Billing: Monthly</Badge>
                  <Badge variant="secondary" className="px-3 py-1 font-medium">Cycle: Day 1-30</Badge>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50 border border-primary/20 backdrop-blur-sm">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Invite Code</p>
                    <p className="text-xl font-mono font-bold tracking-widest text-primary">SUNRISE-2024</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={copyInviteCode} className="ml-2 hover:bg-primary/10">
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="default" className="flex-1 shadow-lg shadow-primary/20" onClick={() => router.push("/manager/mess-settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Mess
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryMetrics.map((metric, index) => (
            <Card key={index} className="hover:border-primary/30 transition-all duration-300 group">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <h3 className="text-2xl font-bold tracking-tight">{metric.value}</h3>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors">
                    <metric.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant={metric.variant} className="text-[10px] uppercase font-bold py-0 h-5">
                    {metric.variant}
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">{metric.note}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity & Operations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Operations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Operational Hub</CardTitle>
                <CardDescription>Fast access to daily mess management modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {quickOperations.map((op, index) => (
                    <Button
                      key={index}
                      variant={op.variant}
                      className="h-auto flex-col gap-3 py-6 relative hover:border-primary/50"
                      onClick={() => router.push(op.href)}
                    >
                      <div className="p-2.5 rounded-full bg-primary/5">
                        <op.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold">{op.label}</span>
                      {op.count && (
                        <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {op.count}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest financial and operational updates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-primary font-bold">
                  View Full Audit Log
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-muted">
                    <div className={cn(
                      "p-2 rounded-lg mt-1",
                      activity.type === "financial" ? "bg-emerald-500/10 text-emerald-600" : "bg-sky-500/10 text-sky-600"
                    )}>
                      {activity.type === "financial" ? <Wallet className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{activity.title}</p>
                        <span className="text-[10px] text-muted-foreground font-medium">{activity.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {activity.user} • {activity.detail || activity.amount}
                      </p>
                      <div className="pt-2">
                        <Badge variant={activity.status} className="text-[9px] h-4 font-bold uppercase">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-8 w-8">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Secondary Info */}
          <div className="space-y-6">
            {/* Join Requests Summary */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Join Requests</CardTitle>
                </div>
                <CardDescription>New members waiting for your approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold">3 Pending Requests</p>
                    <p className="text-xs text-muted-foreground">Review their applications and approve or reject.</p>
                  </div>
                  <Button className="w-full mt-2" size="sm" onClick={() => router.push("/manager/members")}>
                    Review All
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications / Notices */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base font-bold">Recent Notices</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-primary/10 bg-primary/5 space-y-1">
                    <p className="text-xs font-bold text-primary">IMPORTANT</p>
                    <p className="text-sm font-medium">Monthly bazaar budget update</p>
                    <p className="text-[10px] text-muted-foreground">Posted by you • 2 days ago</p>
                  </div>
                  <div className="p-3 rounded-lg border border-muted space-y-1">
                    <p className="text-sm font-medium">Bazaar schedule for Friday changed</p>
                    <p className="text-[10px] text-muted-foreground">Posted by you • 4 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs font-bold" onClick={() => router.push("/manager/notices")}>
                  View Notice Board
                </Button>
              </CardContent>
            </Card>

            {/* Quick Summary Card */}
            <Card className="bg-slate-950 text-slate-50 border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="h-24 w-24" />
              </div>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-400">Total Mess Fund</CardTitle>
                <h3 className="text-3xl font-bold tracking-tight text-white">৳42,500</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% from last cycle</span>
                </div>
                <Separator className="my-4 bg-slate-800" />
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Total Deposits</span>
                    <span className="font-bold">৳55,000</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Total Expenses</span>
                    <span className="font-bold">৳12,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

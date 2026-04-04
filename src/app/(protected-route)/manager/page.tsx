
"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  Utensils,
  Wallet,
  UserPlus,
  TrendingUp,
  Plus,
  Calendar,
  CheckCircle,
  FileText,
  Settings,
  ArrowRight,
  Clock,
  Bell,
  CreditCard,
  Building2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";

// Fake Summary Data
const summaryData = [
  { title: "Total Members", value: "24", note: "Currently active", icon: Users, color: "bg-blue-500/10 text-blue-600" },
  { title: "Today's Meals", value: "18", note: "Meal entries submitted", icon: Utensils, color: "bg-green-500/10 text-green-600" },
  { title: "Pending Deposits", value: "6", note: "Awaiting approval", icon: Wallet, color: "bg-yellow-500/10 text-yellow-600" },
  { title: "Pending Join Requests", value: "3", note: "Need review", icon: UserPlus, color: "bg-orange-500/10 text-orange-600" },
  { title: "Monthly Expenses", value: "৳18,500", note: "This month so far", icon: TrendingUp, color: "bg-purple-500/10 text-purple-600" },
];

// Quick Actions
const quickActions = [
  { label: "Add Expense", icon: Plus, href: "/manager/expenses", variant: "default" as const },
  { label: "Manage Meals", icon: Calendar, href: "/manager/meals", variant: "outline" as const },
  { label: "Approve Members", icon: CheckCircle, href: "/manager/members", variant: "outline" as const },
  { label: "Post Notice", icon: FileText, href: "/manager/notices", variant: "outline" as const },
  { label: "View Deposits", icon: CreditCard, href: "/manager/deposits", variant: "outline" as const },
  { label: "Mess Settings", icon: Settings, href: "/manager/mess-settings", variant: "outline" as const },
];

// Fake Pending Actions
const pendingActions = [
  { id: 1, name: "Rahim Uddin", type: "Join Request", context: "Requested to join Green Valley Mess", time: "2 hours ago", status: "pending" },
  { id: 2, name: "Karim Ahmed", type: "Deposit", context: "৳5,000 deposit awaiting approval", time: "4 hours ago", status: "pending" },
  { id: 3, name: "Sadia Islam", type: "Meal Off", context: "Requested meal off for tomorrow", time: "5 hours ago", status: "pending" },
  { id: 4, name: "Tasnuva Akter", type: "Join Request", context: "Requested to join via invite code", time: "1 day ago", status: "pending" },
];

// Fake Recent Financial Activity
const recentActivity = [
  { id: 1, title: "Bazaar Expense", amount: "৳2,400", description: "Daily bazaar - Rice, Vegetables, Fish", date: "Today, 10:30 AM" },
  { id: 2, title: "Deposit Approved", amount: "৳3,500", description: "Monthly deposit from Rafi Hassan", date: "Today, 9:15 AM" },
  { id: 3, title: "Utility Bill", amount: "৳1,200", description: "Electricity bill for November", date: "Yesterday, 6:45 PM" },
  { id: 4, title: "Member Payment", amount: "৳4,000", description: "Deposit from Mahmudul Islam", date: "Yesterday, 3:20 PM" },
];

// Fake Notices
const latestNotices = [
  { id: 1, title: "Monthly Bazaar Budget Update", description: "The monthly bazaar budget has been increased to accommodate rising prices.", date: "Posted 2 days ago" },
  { id: 2, title: "Deposit Deadline Reminder", description: "Please submit your monthly deposits by the 5th of every month.", date: "Posted 3 days ago" },
  { id: 3, title: "Meal Schedule Adjustment", description: "Lunch timing has been adjusted to 1:00 PM starting next week.", date: "Posted 5 days ago" },
];

// Mess Overview Data
const messOverview = {
  name: "Green Valley Mess",
  role: "Active Manager",
  billingCycle: "Monthly",
  status: "Stable",
};

export default function ManagerDashboardPage() {
  const router = useRouter();

  return (
    <DashboardPageLayout>
      {/* Header */}
      <DashboardPageHeader
        title="Manager Dashboard"
        description="Manage members, meals, deposits, expenses, and daily mess operations"
      />

      {/* Summary Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {summaryData.map((item, index) => (
            <Card key={index} className="border hover:border-primary/20 transition-colors">
              <CardContent>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.note}</p>
                  </div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Takes 2/3 on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant}
                    className="h-auto py-4 flex flex-col gap-2 items-center justify-center"
                    onClick={() => router.push(action.href)}
                  >
                    <action.icon className="h-5 w-5" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card className="border-orange-200/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <CardTitle className="text-lg">Pending Actions</CardTitle>
              </div>
              <Badge variant="secondary">{pendingActions.length} items</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingActions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.context}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.time}
                    </p>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => router.push("/manager/members")}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Financial Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Recent Financial Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-sm font-semibold text-primary">{item.amount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground shrink-0">{item.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Takes 1/3 on desktop */}
        <div className="space-y-6">
          {/* Mess Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Mess Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Mess Name</p>
                  <p className="font-medium">{messOverview.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Manager Role</p>
                  <p className="font-medium">{messOverview.role}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Billing Cycle</p>
                  <p className="font-medium">{messOverview.billingCycle}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Member Status</p>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {messOverview.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Notices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Latest Notices
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-auto py-1 px-2" onClick={() => router.push("/manager/notices")}>
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {latestNotices.map((notice) => (
                <div key={notice.id} className="space-y-1">
                  <h4 className="font-medium text-sm">{notice.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{notice.description}</p>
                  <p className="text-xs text-muted-foreground">{notice.date}</p>
                  {notice.id !== latestNotices.length && <Separator className="mt-3" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

"use client";

import { useRouter } from "next/navigation";
import {
  Utensils,
  Wallet,
  CreditCard,
  Bell,
  TrendingUp,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Moon,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";

// Fake Summary Data for Member
const summaryData = [
  { title: "My Meals (Today)", value: "2", note: "Breakfast, Lunch", icon: Utensils, color: "bg-green-500/10 text-green-600" },
  { title: "Total Deposits", value: "৳15,000", note: "Lifetime deposits", icon: Wallet, color: "bg-blue-500/10 text-blue-600" },
  { title: "Current Balance", value: "৳3,200", note: "Available for expenses", icon: CreditCard, color: "bg-purple-500/10 text-purple-600" },
  { title: "Monthly Cost", value: "৳4,800", note: "This month so far", icon: TrendingUp, color: "bg-orange-500/10 text-orange-600" },
];

// Fake Recent Activity
const recentActivity = [
  { id: 1, title: "Deposit Added", description: "৳5,000 deposited by manager", date: "Today, 10:30 AM", type: "deposit" },
  { id: 2, title: "Meal Recorded", description: "Dinner marked as present", date: "Yesterday, 8:45 PM", type: "meal" },
  { id: 3, title: "Bazaar Expense", description: "৳2,400 spent on daily bazaar", date: "Yesterday, 2:30 PM", type: "expense" },
  { id: 4, title: "Meal Off Request", description: "Requested meal off for tomorrow", date: "2 days ago", type: "request" },
];

// Fake Meal Calendar (next 7 days)
const mealCalendar = [
  { day: "Today", breakfast: true, lunch: true, dinner: false },
  { day: "Tomorrow", breakfast: true, lunch: false, dinner: true },
  { day: "Wed", breakfast: true, lunch: true, dinner: true },
  { day: "Thu", breakfast: false, lunch: true, dinner: true },
  { day: "Fri", breakfast: true, lunch: true, dinner: false },
];

// Fake Notices
const latestNotices = [
  { id: 1, title: "Deposit Deadline Reminder", description: "Please submit your monthly deposits by the 5th of every month.", date: "Posted 2 days ago", priority: "high" },
  { id: 2, title: "Meal Schedule Update", description: "Lunch timing has been adjusted to 1:00 PM starting next week.", date: "Posted 3 days ago", priority: "normal" },
  { id: 3, title: "Monthly Summary Available", description: "October 2024 monthly expense summary is now available.", date: "Posted 5 days ago", priority: "normal" },
];

export default function MemberDashboardPage() {
  const router = useRouter();

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="My Dashboard"
        description="Track your meals, deposits, and stay updated with mess notices"
      />

      {/* Summary Cards */}
      <section className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.map((item, index) => (
            <Card key={index}>
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
          {/* Meal Calendar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Meal Calendar
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/meal-off-requests")}>
                Request Meal Off
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {mealCalendar.map((day, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium mb-2">{day.day}</p>
                    <div className="space-y-1">
                      <div className={`text-xs px-2 py-1 rounded ${day.breakfast ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        B
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${day.lunch ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        L
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${day.dinner ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                        D
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-100" />
                  <span>Opted In</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-muted" />
                  <span>Meal Off</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                    item.type === "deposit" ? "bg-green-100 text-green-600" :
                    item.type === "meal" ? "bg-blue-100 text-blue-600" :
                    item.type === "expense" ? "bg-orange-100 text-orange-600" :
                    "bg-purple-100 text-purple-600"
                  }`}>
                    {item.type === "deposit" ? <Wallet className="h-4 w-4" /> :
                     item.type === "meal" ? <Utensils className="h-4 w-4" /> :
                     item.type === "expense" ? <TrendingUp className="h-4 w-4" /> :
                     <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center" onClick={() => router.push("/dashboard/meal-off-requests")}>
                  <Moon className="h-5 w-5" />
                  <span className="text-xs">Request Meal Off</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center" onClick={() => router.push("/dashboard/deposits")}>
                  <Wallet className="h-5 w-5" />
                  <span className="text-xs">View Deposits</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center" onClick={() => router.push("/dashboard/expenses")}>
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">View Expenses</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center" onClick={() => router.push("/dashboard/notices")}>
                  <Bell className="h-5 w-5" />
                  <span className="text-xs">All Notices</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Takes 1/3 on desktop */}
        <div className="space-y-6">
          {/* Latest Notices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notices
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/notices")}>
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {latestNotices.map((notice) => (
                <div key={notice.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{notice.title}</h4>
                    {notice.priority === "high" && (
                      <Badge variant="destructive" className="text-xs">Important</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{notice.description}</p>
                  <p className="text-xs text-muted-foreground">{notice.date}</p>
                  {notice.id !== latestNotices.length && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Deposit Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Deposit Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">November 2024</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">Paid</Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">October 2024</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">Paid</Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">September 2024</span>
                  <Badge variant="outline" className="text-green-600 border-green-200">Paid</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/deposits")}>
                View All Deposits
              </Button>
            </CardContent>
          </Card>

          {/* Help / Contact */}
          <Card>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Need Help?</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Contact your mess manager for any issues with meals, deposits, or account.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

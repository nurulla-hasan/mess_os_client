"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  Utensils, 
  CreditCard, 
  FileText, 
  Calendar, 
  Megaphone, 
  MessageSquare,
  ShoppingCart,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const quickActions = [
  { title: "My Bill", icon: FileText, href: "/dashboard/my-bill", color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Submit Payment", icon: CreditCard, href: "/dashboard/payments", color: "text-primary", bg: "bg-primary/10" },
  { title: "Request Meal Off", icon: Calendar, href: "/dashboard/meal-off-requests", color: "text-amber-500", bg: "bg-amber-500/10" },
  { title: "My Meals", icon: Utensils, href: "/dashboard/meals", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Notices", icon: Megaphone, href: "/dashboard/notices", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { title: "Complaints", icon: MessageSquare, href: "/dashboard/complaints", color: "text-rose-500", bg: "bg-rose-500/10" },
];

export default function MemberDashboardPage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Welcome back, Nasir!"
        description="Here is what's happening in Green House Mess today."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Status Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Wallet className="h-16 w-16" />
              </div>
              <CardContent>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Balance</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-3xl font-bold">৳1,250</p>
                  <Badge variant="success" className="h-5 text-xs">ADVANCE</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Last updated 2 hours ago</p>
              </CardContent>
            </Card>

            <Card className="bg-emerald-500/5 border-emerald-500/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Utensils className="h-16 w-16" />
              </div>
              <CardContent>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meals This Month</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-3xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">/ 90 expected</p>
                </div>
                <div className="h-1.5 w-full bg-emerald-500/10 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[46%]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Tiles */}
          <div>
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <Link key={i} href={action.href}>
                  <Card className="hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="flex flex-col items-center justify-center gap-3 text-center">
                      <div className={`p-3 rounded-2xl ${action.bg} group-hover:scale-110 transition-transform`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <span className="text-xs font-bold">{action.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5" />
                <div>
                  <p className="text-xs font-bold">Payment Approved</p>
                  <p className="text-xs text-muted-foreground">৳2,000 deposit confirmed by manager.</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday, 4:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="text-xs font-bold">New Notice Posted</p>
                  <p className="text-xs text-muted-foreground">Monthly mess meeting scheduled for May 10.</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-600">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Next Market Duty</span>
              </div>
              <div>
                <p className="text-sm font-bold">Tomorrow, May 07</p>
                <p className="text-xs text-muted-foreground">Assigned with: Rahim & Tanvir</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-amber-600 border-amber-500/20 bg-background">
                View Checklist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

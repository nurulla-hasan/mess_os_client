"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IMemberDashboardData } from "@/types/dashboard.type";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const quickActionConfigs = [
  { id: "myBill", title: "My Bill", icon: FileText, href: "/dashboard/my-bill", color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "submitPayment", title: "Submit Payment", icon: CreditCard, href: "/dashboard/payments", color: "text-primary", bg: "bg-primary/10" },
  { id: "requestMealOff", title: "Request Meal Off", icon: Calendar, href: "/dashboard/meal-off-requests", color: "text-amber-500", bg: "bg-amber-500/10" },
  { id: "myMeals", title: "My Meals", icon: Utensils, href: "/dashboard/meals", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "notices", title: "Notices", icon: Megaphone, href: "/dashboard/notices", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { id: "complaints", title: "Complaints", icon: MessageSquare, href: "/dashboard/complaints", color: "text-rose-500", bg: "bg-rose-500/10" },
];

export default function MemberDashboardView({ data }: { data: IMemberDashboardData }) {
  const { billing, meals, marketDuty, recent, quickLinks } = data;
  
  const activeQuickActions = quickActionConfigs.filter(action => quickLinks[action.id]);

  return (
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
              <div className="flex items-baseline gap-3 mt-1">
                <p className="text-3xl font-bold">৳{billing.balance.amount.toLocaleString()}</p>
                <Badge variant={billing.balance.type === "advance" ? "success" : "destructive"} className="h-5 text-xs">
                  {billing.balance.type.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Status: <span className="font-bold capitalize">{billing.balance.status}</span></p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-500/5 border-emerald-500/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Utensils className="h-16 w-16" />
            </div>
            <CardContent>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meals This Month</p>
              <div className="flex items-baseline gap-3 mt-1">
                <p className="text-3xl font-bold">{meals.total}</p>
                <p className="text-xs text-muted-foreground">/ {meals.records} records</p>
              </div>
              <div className="flex gap-2 mt-2">
                {Object.entries(meals.breakdown).map(([key, val]) => (
                   val > 0 && <Badge key={key} variant="outline" className="text-xs">{key}: {val}</Badge>
                ))}
              </div>
              {meals.total > 0 && (
                <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Est. Meal Rate</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {meals.estimatedMealRate > 0 ? `৳${meals.estimatedMealRate.toFixed(2)}` : "—"}
                    </span>
                  </div>
                  {meals.estimatedMealRate === 0 && meals.estimatedMealExpense === 0 && (
                    <p className="text-[10px] text-muted-foreground/70 italic">
                      Add expenses with meal category to calculate rate
                    </p>
                  )}
                </div>
               )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Access Tiles */}
        <div>
          <h3 className="text-md font-bold mb-4 flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {activeQuickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <Card className="hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className={`p-3 rounded-lg ${action.bg} group-hover:scale-110 transition-transform`}>
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <span className="text-sm font-semibold">{action.title}</span>
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
            <CardTitle className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recent.activity.length > 0 ? (
              recent.activity.map((act, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn(
                    "h-2 w-2 rounded-full mt-1.5",
                    act.type === "payment" ? "bg-emerald-500" : "bg-primary"
                  )} />
                  <div>
                    <p className="text-sm font-bold">{act.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{act.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(act.createdAt), "MMM dd, hh:mm a")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>

        {marketDuty.next ? (
          <Card className="bg-amber-500/5 border-amber-500/20">
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-amber-600">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Next Market Duty</span>
              </div>
              <div>
                <p className="text-sm font-bold">{format(new Date(marketDuty.next.targetDate), "EEEE, MMM dd")}</p>
                <p className="text-xs text-muted-foreground">Estimated Budget: ৳{marketDuty.next.estimatedBudget}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-muted-foreground uppercase">Items:</p>
                <div className="flex flex-wrap gap-1">
                  {marketDuty.next.shoppingItems.slice(0, 3).map((item, idx) => (
                    <Badge key={idx} variant="pending">
                      {item.name} ({item.quantity})
                    </Badge>
                  ))}
                  {marketDuty.next.shoppingItems.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{marketDuty.next.shoppingItems.length - 3} more</span>
                  )}
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="w-full text-amber-600 border-amber-500/20 bg-background hover:bg-amber-500/10">
                <Link href="/dashboard/market-duties">View Details</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
             <CardContent className="text-center">
                <p className="text-xs text-muted-foreground">No upcoming market duty assigned.</p>
             </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPendingActions, ITodayStats } from "@/types/dashboard.type";
import { 
  Users, 
  CreditCard, 
  Receipt, 
  Zap, 
  MessageSquare, 
  ShoppingCart,
  UtensilsCrossed,
  LayoutGrid,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface OperationalHubProps {
  pendingActions: IPendingActions;
  today: ITodayStats;
}

export function OperationalHub({ pendingActions, today }: OperationalHubProps) {
  const shortcuts = [
    { label: "Members", href: "/manager/members", icon: Users, count: pendingActions.joinRequests, colorVar: "var(--chart-1)" },
    { label: "Payments", href: "/manager/payments", icon: CreditCard, count: pendingActions.payments, colorVar: "var(--chart-2)" },
    { label: "Expenses", href: "/manager/expenses", icon: Receipt, count: pendingActions.expenses, colorVar: "var(--chart-3)" },
    { label: "Utilities", href: "/manager/utility-bills", icon: Zap, count: pendingActions.utilities, colorVar: "var(--chart-4)" },
    { label: "Complaints", href: "/manager/complaints", icon: MessageSquare, count: pendingActions.complaints, colorVar: "var(--chart-5)" },
    { label: "Market", href: "/manager/market-schedules", icon: ShoppingCart, count: pendingActions.marketDuties, colorVar: "var(--primary)" },
  ];

  const totalTodayMeals = Object.values(today.mealBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Quick Actions Hub */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-3">
            <LayoutGrid className="w-4 h-4 text-primary" />
            Operational Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {shortcuts.map((shortcut, idx) => (
              <Link key={idx} href={shortcut.href} className="group">
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 px-3 relative border-2 hover:border-primary/30 transition-all rounded-lg"
                >
                  <div 
                    className="p-1.5 rounded-lg mr-3 transition-all duration-300 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground"
                    style={{ 
                      backgroundColor: `color-mix(in srgb, ${shortcut.colorVar}, transparent 90%)`,
                      color: shortcut.colorVar
                    }}
                  >
                    <shortcut.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">{shortcut.label}</span>
                  
                  {shortcut.count > 0 && (
                    <Badge 
                      variant="rejected" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full border-2 border-background text-xs font-bold shadow-sm"
                    >
                      {shortcut.count.toLocaleString()}
                    </Badge>
                  )}
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Meal Breakdown */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-3">
            <UtensilsCrossed className="w-4 h-4 text-primary" />
            Today&apos;s Status
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            {Object.entries(today.mealBreakdown).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  <span className="text-sm font-semibold text-muted-foreground">{category}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold">{count.toLocaleString()}</span>
                  <span className="text-xs font-bold text-muted-foreground/60 uppercase">meals</span>
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-2 border-t border-dashed flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-foreground/70 tracking-wider">Total Meals</span>
              <Badge variant="secondary" className="font-bold px-3 py-0.5 text-xs bg-primary/10 text-primary border-none">
                {totalTodayMeals.toLocaleString()} meals
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

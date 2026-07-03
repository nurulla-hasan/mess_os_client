import { Card, CardContent } from "@/components/ui/card";
import { IDashboardSummary } from "@/types/dashboard.type";
import { 
  Users, 
  Utensils, 
  CreditCard, 
  Wallet, 
  Clock, 
  Zap, 
  MessageSquare, 
  ShoppingCart,
  DollarSign
} from "lucide-react";

interface KPICardsProps {
  summary: IDashboardSummary;
}

export function KPICards({ summary }: KPICardsProps) {
  const kpis = [
    {
      label: "Active Members",
      value: summary.activeMembers.toLocaleString(),
      icon: Users,
      subValue: "Approved users",
      colorVar: "var(--chart-1)"
    },
    {
      label: "Today's Meals",
      value: summary.todayMeals.toLocaleString(),
      icon: Utensils,
      subValue: `${summary.todayMealRecords.toLocaleString()} entries today`,
      colorVar: "var(--chart-2)"
    },
    {
      label: "Pending Payments",
      value: `৳${summary.pendingPaymentsAmount.toLocaleString()}`,
      icon: CreditCard,
      subValue: `${summary.pendingPaymentsCount.toLocaleString()} pending`,
      colorVar: "var(--chart-3)",
      // Dot removed as per user request
    },
    {
      label: "Monthly Expenses",
      value: `৳${summary.monthlyExpensesAmount.toLocaleString()}`,
      icon: Wallet,
      subValue: `${summary.monthlyExpensesCount.toLocaleString()} total`,
      colorVar: "var(--chart-4)"
    },
    {
      label: "Pending Expenses",
      value: `৳${summary.pendingExpensesAmount.toLocaleString()}`,
      icon: Clock,
      subValue: `${summary.pendingExpensesCount.toLocaleString()} to approve`,
      colorVar: "var(--destructive)",
      isWarning: summary.pendingExpensesCount > 0
    },
    {
      label: "Monthly Utilities",
      value: `৳${summary.monthlyUtilitiesAmount.toLocaleString()}`,
      icon: Zap,
      subValue: `${summary.unpaidUtilities.toLocaleString()} bills due`,
      colorVar: "var(--chart-5)",
      isWarning: summary.unpaidUtilities > 0
    },
    {
      label: "Est. Meal Rate",
      value: summary.estimatedMealRate > 0
        ? `৳${summary.estimatedMealRate.toFixed(2)}`
        : "—",
      icon: DollarSign,
      subValue: summary.estimatedMealRate > 0
        ? `৳${summary.estimatedMealExpense.toLocaleString()} ÷ ${summary.estimatedTotalMeals} meals`
        : summary.estimatedTotalMeals > 0
          ? "Awaiting expenses"
          : "No data this month",
      colorVar: "var(--chart-2)"
    },
    {
      label: "Open Complaints",
      value: summary.openComplaints.toLocaleString(),
      icon: MessageSquare,
      subValue: "Active issues",
      colorVar: "var(--primary)",
      isWarning: summary.openComplaints > 0
    },
    {
      label: "Market Duties",
      value: summary.pendingMarketDuties.toLocaleString(),
      icon: ShoppingCart,
      subValue: "Pending tasks",
      colorVar: "var(--secondary-foreground)",
      isWarning: summary.pendingMarketDuties > 0
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <Card key={idx}>
          <CardContent>
            <div className="flex items-center gap-4">
              <div 
                className="p-2.5 rounded-lg border transition-colors flex items-center justify-center"
                style={{ 
                  backgroundColor: `color-mix(in srgb, ${kpi.colorVar}, transparent 90%)`,
                  borderColor: `color-mix(in srgb, ${kpi.colorVar}, transparent 80%)`,
                  color: kpi.colorVar
                }}
              >
                <kpi.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                  {kpi.label}
                </p>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{kpi.value}</h3>
                  {kpi.isWarning && (
                    <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-medium truncate">
                  {kpi.subValue}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

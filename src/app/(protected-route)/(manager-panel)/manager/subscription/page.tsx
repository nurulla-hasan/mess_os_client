"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Check, 
  History, 
  Zap, 
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/custom/data-table";
import { ColumnDef } from "@tanstack/react-table";

type SubsHistory = {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: "success" | "failed";
};

const columns: ColumnDef<SubsHistory>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="text-sm">{row.original.date}</span>,
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <span className="text-sm font-medium">{row.original.plan}</span>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span className="text-sm font-bold">৳{row.original.amount}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "success" ? "success" : "rejected"}>
        {row.original.status}
      </Badge>
    ),
  },
];

const mockHistory: SubsHistory[] = [
  { id: "h1", date: "Apr 01, 2024", plan: "Standard Plan", amount: 500, status: "success" },
  { id: "h2", date: "Mar 01, 2024", plan: "Standard Plan", amount: 500, status: "success" },
];

export default function ManagerSubscriptionPage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Subscription & Billing"
        description="Manage your mess subscription, view billing history, and upgrade your plan."
      />

      <div className="space-y-6">
        {/* Current Subscription Status */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent>
            <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-3">
                    Standard Monthly Plan
                    <Badge variant="success" className="h-5 text-xs">ACTIVE</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">Your mess is currently on the standard plan. Renewing on June 01, 2024.</p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <Button variant="outline" size="sm" className="flex-1 md:flex-none text-rose-600 border-rose-500/20">Cancel Subscription</Button>
                <Button size="sm" className="flex-1 md:flex-none">Upgrade Plan</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Plan */}
          <Card className="opacity-70">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Starter</CardTitle>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold">৳0</span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[ "Up to 5 Members", "Basic Meal Tracking", "Standard Reports"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>Current Plan</Button>
            </CardFooter>
          </Card>

          {/* Professional Plan (Recommended) */}
          <Card className="border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Recommended</div>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Standard</CardTitle>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold text-primary">৳500</span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[ "Up to 20 Members", "AI Shopping Assistant", "Advanced Billing", "Priority Support"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <Zap className="h-3.5 w-3.5 text-primary fill-primary/20" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button className="w-full shadow-lg shadow-primary/20">Current Active Plan</Button>
            </CardFooter>
          </Card>

          {/* Ultimate Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Premium</CardTitle>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold">৳1000</span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[ "Unlimited Members", "Custom Branding", "Financial Auditing", "Multi-Manager Support"].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Upgrade to Premium</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <History className="h-4 w-4 text-muted-foreground" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={mockHistory} />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}


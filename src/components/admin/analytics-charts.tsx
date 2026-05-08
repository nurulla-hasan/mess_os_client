"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {  Building2, Users } from "lucide-react";

interface ChartDataPoint {
  date: string;
  count: number;
}

interface AnalyticsChartsProps {
  userTrends: ChartDataPoint[];
  messTrends: ChartDataPoint[];
}

export function AnalyticsCharts({ userTrends, messTrends }: AnalyticsChartsProps) {
  // Format dates for better readability in charts
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* User Growth Chart */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            User Acquisition
          </CardTitle>
          <CardDescription className="text-sm">Daily new user registrations (Last 30 days)</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userTrends}>
              <defs>
                <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis} 
                tick={{ fontSize: 11, fontWeight: 500 }} 
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis 
                tick={{ fontSize: 11, fontWeight: 500 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="var(--primary)" 
                fillOpacity={1} 
                fill="url(#colorUser)" 
                strokeWidth={2}
                name="New Users"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Mess Growth Chart */}
      <Card className="bg-emerald-500/5 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2 text-emerald-600">
            <Building2 className="h-5 w-5" />
            Mess Onboarding
          </CardTitle>
          <CardDescription className="text-sm">Daily new mess registrations (Last 30 days)</CardDescription>
        </CardHeader>
        <CardContent className="h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={messTrends}>
              <defs>
                <linearGradient id="colorMess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatXAxis} 
                tick={{ fontSize: 11, fontWeight: 500 }} 
                axisLine={false}
                tickLine={false}
                minTickGap={30}
              />
              <YAxis 
                tick={{ fontSize: 11, fontWeight: 500 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorMess)" 
                strokeWidth={2}
                name="New Messes"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

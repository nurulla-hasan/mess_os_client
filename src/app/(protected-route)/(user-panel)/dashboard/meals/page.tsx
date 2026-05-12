"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { DataTable } from "@/components/ui/custom/data-table";
// import { memberMealColumns } from "@/components/meals/member-columns";
// import { mockMeals } from "@/components/meals/mockData";
import { 
  Utensils, 
  Calendar, 
  TrendingUp, 
  Filter,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberMealsPage() {
  // const myMeals = mockMeals.filter(m => m.member.name === "Nasir Uddin"); // Mocking current user filter
  // const totalMeals = myMeals.reduce((acc, m) => acc + m.count, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Meal Logs"
          description="View your personal meal consumption history and monthly totals."
        />
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" /> Select Month
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Monthly Summary Cards */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Utensils className="h-4 w-4 text-primary" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-3xl font-bold">{totalMeals}</p> */}
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Total Meals Served</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                Estimated Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-xl font-bold">৳{(totalMeals * 45).toFixed(0)}</p> */}
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Based on ~৳45 rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Meal History Table */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Detailed History
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              <Filter className="mr-1 h-3.5 w-3.5" /> Filter Logs
            </Button>
          </CardHeader>
          <CardContent>
            {/* <DataTable columns={memberMealColumns} data={myMeals} /> */}
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

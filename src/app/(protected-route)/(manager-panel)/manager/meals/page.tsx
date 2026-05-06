"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/meals/columns";
import { mockMeals } from "@/components/meals/mockData";
import { 
  Utensils, 
  Plus, 
  Search,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function ManagerMealsPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardHeader
          title="Meals Management"
          description="Log daily meals for members and monitor monthly consumption patterns."
        />
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border bg-background px-1 h-9">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 text-sm font-medium">May 06, 2024</span>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Log Meal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Daily Summary Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" />
                Today&apos;s Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total Meals</p>
                  <p className="text-3xl font-black text-primary">34</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Logged</p>
                  <p className="text-xl font-bold">12/15</p>
                </div>
              </div>
              <Separator className="bg-primary/10" />
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Breakfast</span>
                  <span>10</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Lunch</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Dinner</span>
                  <span>12</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Month to Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-black">458</p>
              <p className="text-xs text-muted-foreground uppercase font-bold mt-1 tracking-tight">Total Meals in May</p>
            </CardContent>
          </Card>
        </div>

        {/* Daily List Table */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold">Daily Meal List</CardTitle>
            <div className="relative w-48">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search member..." className="h-8 pl-8 text-xs w-full" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={mockMeals} />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/ai-shopping/columns";
import { mockAiLists } from "@/components/ai-shopping/mockData";
import { 
  Sparkles, 
  ShoppingCart, 
  History, 
  Clock, 
  CheckCircle2, 
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export default function ManagerAiShoppingPage() {
  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="AI Shopping Assistant"
          description="Generate automated shopping lists from your meal plans and convert them to market schedules."
        />
        <Button size="sm" className="bg-primary shadow-lg shadow-primary/20">
          <Sparkles className="mr-2 h-4 w-4" /> Generate New List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Generation Form / Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Plus className="h-4 w-4 text-primary" />
                Quick Generate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">Select Menu Plan</p>
                <Select defaultValue="next-week">
                  <SelectTrigger className="w-full h-9">
                    <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="next-week">Next 7 Days</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="default" className="w-full h-9">
                <Sparkles className="mr-2 h-4 w-4" /> Generate List
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* List Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              Generated Shopping Lists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList variant="line" className="mb-4">
                <TabsTrigger value="all">All Lists</TabsTrigger>
                <TabsTrigger value="draft" className="flex items-center gap-3">
                  <Clock className="h-4 w-4" />
                  <span>Drafts</span>
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Approved</span>
                </TabsTrigger>
                <TabsTrigger value="converted" className="flex items-center gap-3">
                  <History className="h-4 w-4" />
                  <span>Converted</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <DataTable columns={columns} data={mockAiLists} />
              </TabsContent>
              
              <TabsContent value="draft">
                <DataTable columns={columns} data={mockAiLists.filter(l => l.status === "draft")} />
              </TabsContent>

              <TabsContent value="approved">
                <DataTable columns={columns} data={mockAiLists.filter(l => l.status === "approved")} />
              </TabsContent>

              <TabsContent value="converted">
                <DataTable columns={columns} data={mockAiLists.filter(l => l.status === "converted")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}


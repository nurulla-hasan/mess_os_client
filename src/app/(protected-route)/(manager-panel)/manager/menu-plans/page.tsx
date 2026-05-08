"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/menu-plans/columns";
import { mockMenuPlans } from "@/components/menu-plans/mockData";
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Archive,
  Plus,
  LayoutList
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerMenuPlansPage() {
  const publishedPlans = mockMenuPlans.filter(p => p.status === "published");
  const draftPlans = mockMenuPlans.filter(p => p.status === "draft");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Menu Plans"
          description="Design and publish daily meal menus. Use AI to generate healthy meal ideas."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-primary border-primary/20 bg-primary/5">
            <Sparkles className="mr-2 h-4 w-4" /> AI Generate
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> New Plan
          </Button>
        </div>
      </div>

      <div>
        <Tabs defaultValue="published" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="published" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Published</span>
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex items-center gap-2">
              <LayoutList className="h-4 w-4" />
              <span>Drafts ({draftPlans.length})</span>
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              <span>Archived</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="published">
            <DataTable columns={columns} data={publishedPlans} />
          </TabsContent>
          
          <TabsContent value="drafts">
            <DataTable columns={columns} data={draftPlans} />
          </TabsContent>

          <TabsContent value="archived">
            <DataTable columns={columns} data={mockMenuPlans.filter(p => p.status === "archived")} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


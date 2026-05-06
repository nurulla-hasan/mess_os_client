"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/admin/messes/columns";
import { mockAdminMesses } from "@/components/admin/messes/mockData";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

export default function AdminMessesPage() {
  const activeMesses = mockAdminMesses.filter(m => m.status === "active");
  const suspendedMesses = mockAdminMesses.filter(m => m.status === "suspended");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardHeader
          title="Platform Messes"
          description="Monitor all registered messes, track growth, and manage global mess statuses."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icons.Filter /> Filters
          </Button>
        </div>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Icons.Building2 className="h-4 w-4" />
              <span>All Messes</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Icons.ShieldCheck className="h-4 w-4" />
              <span>Active</span>
            </TabsTrigger>
            <TabsTrigger value="suspended" className="flex items-center gap-2">
              <Icons.ShieldAlert className="h-4 w-4" />
              <span>Suspended</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockAdminMesses} searchKey="name" />
          </TabsContent>
          
          <TabsContent value="active">
            <DataTable columns={columns} data={activeMesses} />
          </TabsContent>

          <TabsContent value="suspended">
            <DataTable columns={columns} data={suspendedMesses} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}

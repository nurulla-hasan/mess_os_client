"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/admin/users/columns";
import { mockAdminUsers } from "@/components/admin/users/mockData";
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  const blockedUsers = mockAdminUsers.filter(u => u.status === "blocked");
  const admins = mockAdminUsers.filter(u => u.globalRole === "super_admin");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardHeader
          title="Platform Users"
          description="Manage all registered users, adjust global roles, and handle account suspensions."
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter /> Filters
          </Button>
        </div>
      </div>

      <div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList variant="line" className="mb-4">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>All Users</span>
            </TabsTrigger>
            <TabsTrigger value="admins" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Super Admins</span>
            </TabsTrigger>
            <TabsTrigger value="blocked" className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>Blocked</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <DataTable columns={columns} data={mockAdminUsers} searchKey="name" />
          </TabsContent>
          
          <TabsContent value="admins">
            <DataTable columns={columns} data={admins} />
          </TabsContent>

          <TabsContent value="blocked">
            <DataTable columns={columns} data={blockedUsers} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}

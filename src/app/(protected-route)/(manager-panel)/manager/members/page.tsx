"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, History } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns, pendingColumns } from "@/components/members/columns";
import { activeMembers, pendingRequests, inactiveMembers } from "@/components/members/mockData";

export default function ManagerMembersPage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Members Management"
        description="Oversee your community. Approve new join requests, manage active members, and view history."
      />

      <div>
        <Tabs defaultValue="active">
          <TabsList variant="line" className="mb-3">
            <TabsTrigger value="active">
              <Users />
              <span className="hidden sm:inline">Active</span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              <UserPlus />
              <span className="hidden sm:inline">Pending</span>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              <History />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <DataTable
              columns={columns}
              data={activeMembers}
            />
          </TabsContent>
          
          <TabsContent value="pending">
            <DataTable
              columns={pendingColumns}
              data={pendingRequests}
            />
          </TabsContent>
          
          <TabsContent value="inactive">
            <DataTable
              columns={columns}
              data={inactiveMembers}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
}


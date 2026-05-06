"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { userColumns } from "@/components/members/user-columns";
import { activeMembers } from "@/components/members/mockData";
import { Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MemberMembersPage() {
  // Members only see active members list
  const members = activeMembers;

  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Mess Members"
        description="View all active members and managers in your mess."
      />

      <div className="mt-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Active Members List
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search member..." className="h-8 pl-8 text-xs w-full" />
            </div>
          </CardHeader>
          <CardContent>
            <DataTable columns={userColumns} data={members} />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

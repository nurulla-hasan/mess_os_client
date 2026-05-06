"use client";

import PageLayout from "@/components/ui/custom/page-layout";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <PageLayout>
      <DashboardPageHeader
        title="Users Management"
        description="Manage platform users, roles, and blocks."
      />
      <div className="mt-8">
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Platform Users</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This page will display a data table of all users across the platform, allowing super admins to manage roles and block/unblock users.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}

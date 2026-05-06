"use client";

import PageLayout from "@/components/ui/custom/page-layout";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function AdminStatsPage() {
  return (
    <PageLayout>
      <DashboardPageHeader
        title="Platform Statistics"
        description="View analytics and usage metrics."
      />
      <div className="mt-8">
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Platform Stats</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This page will display charts and statistics regarding the total users, active messes, and overall platform growth.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}

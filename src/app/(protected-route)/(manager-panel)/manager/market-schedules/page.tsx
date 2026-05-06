"use client";

import PageLayout from "@/components/ui/custom/page-layout";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";

export default function Page() {
  return (
    <PageLayout>
      <DashboardPageHeader
        title="Market Schedules"
        description="View and manage Market Schedules."
      />
      <div className="mt-8">
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <LayoutGrid className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Market Schedules</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This is a placeholder page for Market Schedules. The UI will be designed later.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";

export default function Page() {
  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Meals"
        description="View and manage Meals."
      />
      <div className="mt-8">
        <Card>
          <CardContent className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <LayoutGrid className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Meals</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              This is a placeholder page for Meals. The UI will be designed later.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

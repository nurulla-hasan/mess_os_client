import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { getSubscriptionPlans } from "@/services/admin.service";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/admin/subscriptions/columns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function AdminSubscriptionsPage() {
  const response = await getSubscriptionPlans();
  const plans = response?.data || [];

  return (
    <DashboardPageLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <DashboardPageHeader
          title="Subscription Plans"
          description="Manage and configure the platform's subscription tiers, pricing, and feature limitations."
        />
        <Button>
          <Plus /> Create New Plan
        </Button>
      </div>

      <div className="space-y-6">
        <Alert className="bg-primary/5 border-primary/20 text-primary">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="font-bold">Plan Management</AlertTitle>
          <AlertDescription className="text-xs">
            These plans are available for Mess Managers during onboarding and renewal. Changing a plan&apos;s price or features will only affect new subscriptions.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Active Subscription Tiers
              </CardTitle>
              <CardDescription className="text-sm">Overview of all configured subscription models.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={plans}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}

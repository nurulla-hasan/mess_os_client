import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getManagerDashboard } from "@/services/mess.service";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import { DashboardHeader } from "@/components/manager/dashboard/dashboard-header";
import { KPICards } from "@/components/manager/dashboard/kpi-cards";
import { OperationalHub } from "@/components/manager/dashboard/operational-hub";
import { DashboardSidebar } from "@/components/manager/dashboard/dashboard-sidebar";

export default async function ManagerDashboardPage() {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <Alert variant="destructive" className="border-2">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold uppercase tracking-wider">No Active Mess Found</AlertTitle>
          <AlertDescription className="font-medium">
            You don&apos;t have an active mess associated with your account. Please create or join a mess first.
          </AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const response = await getManagerDashboard(activeMessId);

  if (!response?.success || !response.data) {
    return (
      <DashboardPageLayout>
        <Alert className="border-2 border-primary/20">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-bold uppercase tracking-wider">System Sync Required</AlertTitle>
          <AlertDescription className="font-medium">
            {response?.message || "Unable to load dashboard data. Please try again later."}
          </AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const { mess, subscription, selfBalance, summary, today, recent, pendingActions } = response.data;

  return (
    <DashboardPageLayout>
      {/* 1. Header with Mess & Subscription Info */}
      <DashboardHeader mess={mess} subscription={subscription} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content Area (Left 3 Columns) */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* 2. Key KPI Cards (Operational Stats) */}
          <KPICards summary={summary} />

          {/* 3. Operational Hub & Today's Breakdown */}
          <OperationalHub pendingActions={pendingActions} today={today} />
        </div>

        {/* Sidebar Area (Right 1 Column) */}
        <div className="xl:col-span-1">
          <DashboardSidebar summary={summary} notices={recent.notices} selfBalance={selfBalance} />
        </div>
      </div>
    </DashboardPageLayout>
  );
}

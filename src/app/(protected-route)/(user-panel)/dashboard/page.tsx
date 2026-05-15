import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { getActiveMessIdFromCookies, getMe } from "@/services/auth.service";
import { getMemberDashboard } from "@/services/mess.service";
import MemberDashboardView from "@/components/dashboard/member-dashboard-view";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default async function MemberDashboardPage() {
  const activeMessId = await getActiveMessIdFromCookies();
  const userRes = await getMe();
  const user = userRes.data;

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title={`Welcome, ${user?.fullName || "Member"}!`}
          description="You are not currently active in any mess."
        />
        <Alert className="bg-primary/5 border-primary/20 mt-6">
          <InfoIcon className="h-4 w-4 text-primary" />
          <AlertTitle>No Active Mess</AlertTitle>
          <AlertDescription>
            Please join a mess or wait for the manager to approve your request to see your dashboard data.
          </AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const response = await getMemberDashboard(activeMessId);

  if (!response.success) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Dashboard Error"
          description="Something went wrong while loading your dashboard."
        />
        <div className="mt-10 text-center space-y-4">
          <p className="text-muted-foreground">{response.message}</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const data = response.data;

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title={`Welcome back, ${user?.fullName?.split(" ")[0] || "Member"}!`}
        description={`Here is what's happening in ${data.mess.name} today.`}
      />
      <MemberDashboardView data={data} />
    </DashboardPageLayout>
  );
}

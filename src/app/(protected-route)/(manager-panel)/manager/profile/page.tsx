import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { ProfileView } from "@/components/profile/profile-view";
import { getMe } from "@/services/auth.service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function ManagerProfilePage() {
  const res = await getMe();

  if (!res.success) {
    return (
      <DashboardPageLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{res.message || "Failed to load profile."}</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const user = res.data;

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="My Profile"
        description="Manage your personal information, account security, and notification preferences."
      />

      <div className="mt-2">
        <ProfileView role="manager" user={user} />
      </div>
    </DashboardPageLayout>
  );
}


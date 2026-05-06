
import DashboardHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";

export default function ProfilePage() {
  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Profile"
        description="Manage your profile information."
      />
    </DashboardPageLayout>
  );
}

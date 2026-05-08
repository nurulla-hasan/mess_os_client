"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { ProfileView } from "@/components/profile/profile-view";

export default function ManagerProfilePage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="My Profile"
        description="Manage your personal information, account security, and notification preferences."
      />

      <div className="mt-2">
        <ProfileView role="manager" />
      </div>
    </DashboardPageLayout>
  );
}


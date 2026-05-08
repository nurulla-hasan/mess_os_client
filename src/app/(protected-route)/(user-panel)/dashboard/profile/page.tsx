"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { ProfileView } from "@/components/profile/profile-view";

export default function MemberProfilePage() {
  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="My Profile"
        description="Update your personal details, manage security, and view account status."
      />

      <div className="mt-2">
        <ProfileView role="member" />
      </div>
    </DashboardPageLayout>
  );
}


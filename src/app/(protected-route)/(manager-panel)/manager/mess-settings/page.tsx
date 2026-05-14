import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { 
  getMessDetails, 
  getMessMemberOptions 
} from "@/services/mess.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";

// Sub-components (Client Side)
import { ProfileSettings } from "@/components/manager/mess-settings/profile-settings";
import { InviteCodeSettings } from "@/components/manager/mess-settings/invite-code-settings";
import { OperationalSettings } from "@/components/manager/mess-settings/operational-settings";
import { DangerZoneSettings } from "@/components/manager/mess-settings/danger-zone-settings";

export default async function ManagerMessSettingsPage() {
  const messId = await getActiveMessIdFromCookies();

  if (!messId) {
    return (
      <DashboardPageLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>No active mess found. Please select a mess first.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const [messRes, membersRes] = await Promise.all([
    getMessDetails(messId),
    getMessMemberOptions(messId)
  ]);

  const mess = messRes.success ? messRes.data : null;
  const members = membersRes.success ? membersRes.data : [];

  if (!mess) {
    return (
      <DashboardPageLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{messRes.message || "Failed to load mess settings."}</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Mess Settings"
        description="Manage your mess profile, member access codes, and administrative settings."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <ProfileSettings key={`profile-${mess.updatedAt}`} mess={mess} />
        <InviteCodeSettings key={`invite-${mess.updatedAt}`} mess={mess} />
        <OperationalSettings key={`ops-${mess.updatedAt}`} mess={mess} />
        <DangerZoneSettings key={`danger-${mess.updatedAt}`} mess={mess} members={members} />
      </div>
    </DashboardPageLayout>
  );
}


import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMessMemberOptions } from "@/services/mess.service";
import { MessageSquare } from "lucide-react";
import { ReportsContent } from "@/components/reports/reports-content";

export default async function ManagerReportsPage() {
  const messId = await getActiveMessIdFromCookies();

  if (!messId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold">No Active Mess Selected</h2>
          <p className="text-muted-foreground">Please select a mess to view operational reports.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const memberOptionsRes = await getMessMemberOptions(messId);
  const memberOptions = memberOptionsRes?.success ? memberOptionsRes.data : [];

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Operational Reports"
        description="View financial summaries, member statements, and operational performance metrics."
      />
      <ReportsContent messId={messId} memberOptions={memberOptions} />
    </DashboardPageLayout>
  );
}

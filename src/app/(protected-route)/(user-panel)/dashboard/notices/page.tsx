import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/notices/columns";
import { 
  Pin, 
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getNotices } from "@/services/notice.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { format } from "date-fns";
import { ViewNoticeModal } from "@/components/notices/view-notice-modal";

export default async function MemberNoticesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Mess Notices"
          description="Stay updated with the latest announcements."
        />
        <div className="mt-10 flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl bg-muted/30">
          <AlertCircle className="h-10 w-10 text-muted-foreground opacity-20 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Active Mess</h2>
          <p className="text-muted-foreground">Select a mess to view its notices.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const { data, meta } = await getNotices(activeMessId, { ...params, status: "active" });
  const notices = data || [];
  const pinnedNotices = notices.filter(n => n.isPinned);

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Mess Notices"
        description="Stay updated with the latest announcements and important updates from mess management."
      />

      {/* Pinned Notices Summary */}
      {pinnedNotices.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 px-1">
            <Pin className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pinned Announcements</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotices.map((notice) => (
              <Card key={notice._id} className="border-primary/20 bg-primary/5 shadow-none overflow-hidden group hover:bg-primary/10 transition-colors">
                <CardContent className="flex items-center justify-between">
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-sm font-bild truncate">{notice.title}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                      By {notice.createdBy.fullName} • {format(new Date(notice.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <ViewNoticeModal notice={notice} trigger={
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Full
                    </Button>
                  } />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">All Active Notices</span>
        </div>
        <DataTable columns={columns} data={notices} meta={meta} />
      </div>
    </DashboardPageLayout>
  );
}

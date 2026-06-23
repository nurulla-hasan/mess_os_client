import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getNotices } from "@/services/notice.service";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Bell, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { INotice } from "@/types/notice.type";

function NoticeCard({ notice }: { notice: INotice }) {
  return (
    <Card className={notice.isPinned ? "border-primary/30 bg-primary/2" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 border border-border mt-0.5">
              <AvatarImage src={notice.createdBy?.avatar} alt={notice.createdBy?.fullName} />
              <AvatarFallback className="text-xs">
                {notice.createdBy?.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                {notice.title}
                {notice.isPinned && (
                  <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-primary/40 text-primary">
                    PINNED
                  </Badge>
                )}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {notice.createdBy?.fullName || "Unknown"} &middot;{" "}
                {format(new Date(notice.createdAt), "PPp")}
              </p>
            </div>
          </div>
          <Badge
            variant={notice.status === "active" ? "success" : "secondary"}
            className="shrink-0 capitalize"
          >
            {notice.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {notice.content}
        </p>
      </CardContent>
    </Card>
  );
}

export default async function NotificationsPage() {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Notifications"
          description="View all your mess notifications and updates."
        />
        <Alert className="bg-primary/5 border-primary/20 mt-6">
          <InfoIcon className="h-4 w-4 text-primary" />
          <AlertTitle>No Active Mess</AlertTitle>
          <AlertDescription>
            You are not currently active in any mess. Please join or select a mess to see notifications.
          </AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const response = await getNotices(activeMessId, { limit: "50" });
  const notices = response.data || [];

  const pinnedNotices = notices.filter((n) => n.isPinned && n.status === "active");
  const otherNotices = notices.filter((n) => !n.isPinned && n.status === "active");
  const archivedNotices = notices.filter((n) => n.status === "archived");

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Notifications"
        description="Stay updated with the latest announcements from your mess."
      />

      {/* Pinned notices */}
      {pinnedNotices.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Bell className="h-3.5 w-3.5" />
            Pinned
          </h2>
          <div className="space-y-3">
            {pinnedNotices.map((notice) => (
              <NoticeCard key={notice._id} notice={notice} />
            ))}
          </div>
        </section>
      )}

      {/* Recent notices */}
      {otherNotices.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Recent
          </h2>
          <div className="space-y-3">
            {otherNotices.map((notice) => (
              <NoticeCard key={notice._id} notice={notice} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {notices.length === 0 && (
        <div className="mt-16 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted">
            <Bell className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No notifications yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            When the manager posts announcements or notices, they will appear here.
          </p>
        </div>
      )}

      {/* Archived */}
      {archivedNotices.length > 0 && (
        <section className="mt-8">
          <details className="group">
            <summary className="text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none flex items-center gap-2">
              <span className="inline-block transition-transform group-open:rotate-90">&rsaquo;</span>
              Archived ({archivedNotices.length})
            </summary>
            <div className="mt-3 space-y-3 opacity-70">
              {archivedNotices.map((notice) => (
                <NoticeCard key={notice._id} notice={notice} />
              ))}
            </div>
          </details>
        </section>
      )}
    </DashboardPageLayout>
  );
}

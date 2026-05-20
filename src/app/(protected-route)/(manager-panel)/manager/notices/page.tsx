import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/notices/columns";
import { Megaphone, Pin } from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getNotices } from "@/services/notice.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { NoticeFilters } from "@/components/notices/notice-filters";
import { format } from "date-fns";
import { CreateNoticeModal } from "@/components/notices/create-notice-modal";
import { Button } from "@/components/ui/button";

interface Props {
  searchParams: SearchParams;
}

export default async function ManagerNoticesPage({ searchParams }: Props) {
  const messId = await getActiveMessIdFromCookies();
  const params = (await searchParams) as QueryParams;

  if (!messId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <Megaphone className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h2 className="text-xl font-bold">No Active Mess Selected</h2>
          <p className="text-muted-foreground">Please select a mess to manage notices.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  // Fetch notices with filters
  const queryParams = { ...params };
  if (queryParams.status === "all") {
    delete queryParams.status;
  }

  const { data: notices, meta } = await getNotices(messId, queryParams);

  // Filter pinned notices from the result (if status is active)
  const pinnedNotices = (notices || []).filter(n => n.isPinned && n.status === "active");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Mess Notices"
          description="Broadcast announcements and important updates to all mess members."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <NoticeFilters />
          <CreateNoticeModal messId={messId} />
        </div>
      </div>

      {/* Pinned Notices Summary */}
      {pinnedNotices.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 px-1">
            <Pin className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pinned Announcements</span>
          </div>
          {pinnedNotices.map((notice) => (
            <Card key={notice._id} className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold">{notice.title}</h3>
                  <p className="text-xs text-muted-foreground italic">
                    Posted by {notice.createdBy.fullName} on {format(new Date(notice.createdAt), "MMM dd, yyyy")}
                  </p>
                </div>
                {/* <Button variant="ghost" size="sm" className="text-primary font-bold">
                  View Full
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Notices Board */}
      <DataTable
        columns={columns}
        data={notices}
        meta={meta}
      />
    </DashboardPageLayout>
  );
}

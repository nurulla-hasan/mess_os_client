"use client";

import DashboardHeader from "@/components/ui/custom/page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/notices/columns";
import { mockNotices } from "@/components/notices/mockData";
import { 
  Megaphone, 
  Pin
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MemberNoticesPage() {
  const activeNotices = mockNotices.filter(n => n.status === "active");
  const pinnedNotices = activeNotices.filter(n => n.isPinned);

  return (
    <DashboardPageLayout>
      <DashboardHeader
        title="Mess Notices"
        description="Stay updated with the latest announcements and important updates from mess management."
      />

      {/* Pinned Notices Summary */}
      {pinnedNotices.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mb-2">
          <div className="flex items-center gap-2 px-1">
            <Pin className="h-4 w-4 text-primary fill-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pinned Announcements</span>
          </div>
          {pinnedNotices.map((notice) => (
            <Card key={notice.id} className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold">{notice.title}</h3>
                  <p className="text-xs text-muted-foreground italic">Posted by {notice.author} on May 01, 2024</p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary font-bold">
                  View Full
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Notices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-muted-foreground" />
            Latest Announcements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={activeNotices} searchKey="title" />
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
}

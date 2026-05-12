"use client";

import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/notices/columns";
import { mockNotices } from "@/components/notices/mockData";
import { 
  Megaphone, 
  Pin, 
  Archive, 
  Plus,
  LayoutList
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManagerNoticesPage() {
  const activeNotices = mockNotices.filter(n => n.status === "active");
  const pinnedNotices = activeNotices.filter(n => n.isPinned);
  const archivedNotices = mockNotices.filter(n => n.status === "archived");

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Mess Notices"
          description="Broadcast announcements and important updates to all mess members."
        />
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" /> Create Notice
        </Button>
      </div>

      {/* Pinned Notices Summary */}
      {pinnedNotices.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 px-1">
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
      <div className="mt-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <Megaphone className="h-4 w-4 text-muted-foreground" />
              Notice Board Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList variant="line" className="mb-4">
                <TabsTrigger value="active" className="flex items-center gap-3">
                  <LayoutList className="h-4 w-4" />
                  <span>Active Notices</span>
                </TabsTrigger>
                <TabsTrigger value="archived" className="flex items-center gap-3">
                  <Archive className="h-4 w-4" />
                  <span>Archive</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <DataTable columns={columns} data={activeNotices} searchKey="title" />
              </TabsContent>
              
              <TabsContent value="archived">
                <DataTable columns={columns} data={archivedNotices} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
}


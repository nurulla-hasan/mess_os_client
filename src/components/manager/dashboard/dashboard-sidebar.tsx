import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IDashboardSummary, INoticeItem } from "@/types/dashboard.type";
import { 
  Bell, 
  UserPlus, 
  PiggyBank, 
  ArrowRight,
  Pin,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";

interface DashboardSidebarProps {
  summary: IDashboardSummary;
  notices: INoticeItem[];
}

export function DashboardSidebar({ summary, notices }: DashboardSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Mess Fund Stats */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-xs font-black uppercase tracking-widest">Mess Fund</CardTitle>
          <PiggyBank className="w-4 h-4 opacity-80" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs uppercase font-bold text-muted-foreground">Available Balance</p>
            <h2 className="text-3xl font-black tabular-nums">৳{summary.totalMessFund.toLocaleString()}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div 
              className="px-2 py-1.5 rounded-lg border flex flex-col gap-0.5"
              style={{ 
                backgroundColor: `color-mix(in srgb, var(--chart-2), transparent 90%)`,
                borderColor: `color-mix(in srgb, var(--chart-2), transparent 80%)`
              }}
            >
              <p className="text-xs uppercase font-black opacity-70" style={{ color: 'var(--chart-2)' }}>Deposit</p>
              <p className="text-sm font-bold">৳{summary.totalDeposits.toLocaleString()}</p>
            </div>
            <div 
              className="px-2 py-1.5 rounded-lg border flex flex-col gap-0.5"
              style={{ 
                backgroundColor: `color-mix(in srgb, var(--destructive), transparent 90%)`,
                borderColor: `color-mix(in srgb, var(--destructive), transparent 80%)`
              }}
            >
              <p className="text-xs uppercase font-black opacity-70" style={{ color: 'var(--destructive)' }}>Out</p>
              <p className="text-sm font-bold">৳{summary.totalCashOut.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Join Requests Alert */}
      {summary.pendingJoinRequests > 0 && (
        <Card className="bg-primary/5 relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardContent className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20">
                <UserPlus className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Join Request</h4>
                <p className="text-xs font-bold text-muted-foreground">{summary.pendingJoinRequests} user pending</p>
              </div>
            </div>
            <Link href="/manager/members?status=pending">
              <Button size="icon" className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 border-none shadow-md">
                <ArrowRight className="w-4 h-4 text-primary-foreground" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Recent Notices */}
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
            <Bell className="w-4 h-4 text-primary" />
            Notices
          </CardTitle>
          <Link href="/manager/notices" className="text-xs font-bold uppercase text-primary hover:underline">
            View All
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {notices.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-4">No recent updates</p>
            ) : (
              notices.map((notice) => (
                <div key={notice._id} className="group relative pl-4 border-l-2 border-muted hover:border-primary transition-all py-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-xs font-bold truncate group-hover:text-primary transition-colors">
                      {notice.title}
                    </h5>
                    {notice.isPinned && <Pin className="w-2.5 h-2.5 text-primary fill-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed font-medium">
                    {notice.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs font-bold text-muted-foreground uppercase">
                    <CalendarDays className="w-3 h-3" />
                    {timeAgo(notice.createdAt)}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

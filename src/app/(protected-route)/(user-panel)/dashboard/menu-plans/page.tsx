import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/menu-plans/columns";
import { 
  Calendar, 
  UtensilsCrossed,
  Info,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMenuPlans } from "@/services/menu-plan.service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function MemberMenuPlansPage() {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Active Mess Found</AlertTitle>
          <AlertDescription>You are not currently associated with any mess. Please join a mess to view menu plans.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  const response = await getMenuPlans(activeMessId, { status: "published" });
  const publishedPlans = response.data || [];

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title="Weekly Menu Plan"
        description="View the published meal menus for the current and upcoming days."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Weekly Overview Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Published Menu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={publishedPlans} />
          </CardContent>
        </Card>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                Meal Legend
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 font-bold">B</Badge>
                <span className="text-xs text-muted-foreground font-medium">Breakfast</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 font-bold">L</Badge>
                <span className="text-xs text-muted-foreground font-medium">Lunch</span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="h-6 w-6 rounded-full flex items-center justify-center p-0 font-bold">D</Badge>
                <span className="text-xs text-muted-foreground font-medium">Dinner</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Special Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                Menu is subject to change based on market availability. Please check the notices section for any sudden updates.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
}

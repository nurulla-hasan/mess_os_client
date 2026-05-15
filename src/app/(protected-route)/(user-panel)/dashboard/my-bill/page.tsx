import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { 
  Calendar, 
  Receipt, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getBillingCycles, getMyBill } from "@/services/billing.service";
import { SearchParams } from "@/types/global.type";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";
import { CycleSelector } from "@/components/billing/cycle-selector";
import { PayNowButton } from "@/components/billing/pay-now-button";
import { BillDetails } from "@/components/billing/bill-details";

export default async function MemberMyBillPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="My Personal Bill"
          description="View your detailed meal charges and costs."
        />
        <Alert className="mt-6">
          <Info className="h-4 w-4" />
          <AlertTitle>No Active Mess</AlertTitle>
          <AlertDescription>Join a mess to see your billing history.</AlertDescription>
        </Alert>
      </DashboardPageLayout>
    );
  }

  // 1. Get all billing cycles for dropdown
  const cyclesRes = await getBillingCycles(activeMessId);
  
  if (!cyclesRes.success && cyclesRes.status === 403) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="My Personal Bill"
          description="View your detailed meal charges and costs."
        />
        <div className="mt-10 flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl bg-muted/30">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">Feature Locked</h2>
          <p className="text-muted-foreground text-center max-w-md">
            This feature is not included in your mess plan. Ask your manager to upgrade to a premium plan to enable detailed billing.
          </p>
        </div>
      </DashboardPageLayout>
    );
  }

  const cycles = cyclesRes.data || [];
  const params = await searchParams;
  const selectedCycleId = (typeof params.cycleId === "string" ? params.cycleId : params.cycleId?.[0]) || cycles[0]?._id;

  // 2. Get my bill for selected cycle
  let bill = null;
  let cycle = null;
  
  if (selectedCycleId) {
    const billRes = await getMyBill(activeMessId, selectedCycleId);
    if (billRes.success) {
      bill = billRes.data;
    }
    cycle = cycles.find(c => c._id === selectedCycleId);
  }

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Personal Bill"
          description="View your detailed meal charges, share costs, and final payment status for each cycle."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Bill Info & Status */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-none border-muted-foreground/10 bg-muted/5">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-3">
                <Calendar className="h-4 w-4 text-primary" />
                Select Cycle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CycleSelector cycles={cycles} initialId={selectedCycleId} />
            </CardContent>
          </Card>

          {bill && cycle && (
            <Card className="shadow-none border-muted-foreground/10 overflow-hidden">
              <div className={bill.status === 'paid' ? 'h-1.5 bg-emerald-500' : bill.status === 'unpaid' ? 'h-1.5 bg-rose-500' : 'h-1.5 bg-amber-500'} />
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Bill Status</span>
                  <div className="flex items-center gap-2">
                    {cycle.status === 'draft' ? (
                      <div className="flex items-center gap-2 text-amber-500 font-bold">
                        <Clock className="h-4 w-4" />
                        <span>Not Finalized</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 font-bold capitalize">
                        {bill.status === 'paid' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-rose-500" />
                        )}
                        <span>{bill.status}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Billing Period</span>
                  <p className="text-sm font-medium">
                    {format(new Date(cycle.startDate), "MMM dd")} - {format(new Date(cycle.endDate), "MMM dd, yyyy")}
                  </p>
                </div>

                {cycle.finalizedAt && (
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Finalized On</span>
                    <p className="text-sm font-medium">
                      {format(new Date(cycle.finalizedAt), "PPP")}
                    </p>
                  </div>
                )}

                {bill.status !== 'paid' && cycle.status === 'finalized' && bill.summary.finalDue > 0 && (
                  <PayNowButton 
                    messId={activeMessId}
                    amount={bill.summary.finalDue}
                    cycleLabel={`${format(new Date(cycle.startDate), "MMMM yyyy")}`}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bill Details */}
        <div className="lg:col-span-3">
          {bill ? (
            <BillDetails bill={bill} />
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px] border-dashed shadow-none">
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Receipt className="h-12 w-12 opacity-20" />
                <p>Select a billing cycle to view your bill details.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardPageLayout>
  );
}

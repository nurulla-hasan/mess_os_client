import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/billing/columns";
import { getBillingCycles, getMemberBills } from "@/services/billing.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { 
  AlertCircle, 
  Calculator, 
  Wallet, 
  Utensils, 
  Receipt, 
  TrendingUp
} from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { CycleSelector } from "@/components/billing/cycle-selector";
import { SummaryCard } from "@/components/billing/summary-card";
import { BillingActions } from "@/components/billing/billing-actions";
import { Badge } from "@/components/ui/badge";

export default async function ManagerBillingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground opacity-20" />
          <h2 className="text-lg font-bold">No Active Mess</h2>
          <p className="text-sm text-muted-foreground">Select a mess to manage billing.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const cycleId = (typeof params.cycleId === "string" ? params.cycleId : params.cycleId?.[0]);

  // Fetch cycles
  const cyclesRes = await getBillingCycles(activeMessId);
  const cycles = cyclesRes?.data || [];

  if (cycles.length === 0) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="Billing Management"
          description="Finalize monthly billing and manage member invoices."
        />
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-4 text-center bg-muted/30 rounded-xl border border-dashed mt-6">
          <Calculator className="h-10 w-10 text-muted-foreground opacity-20" />
          <h2 className="text-lg font-bold">No Billing Cycles Found</h2>
          <p className="text-sm text-muted-foreground max-w-xs">You haven&apos;t started any billing cycles yet. Cycles are usually generated at the start of each month.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const activeCycle = cycleId 
    ? cycles.find(c => c._id === cycleId) || cycles[0]
    : cycles[0];

  // Fetch member bills for active cycle
  const billsRes = await getMemberBills(activeMessId, activeCycle._id);
  const bills = billsRes?.data || [];

  const summary = activeCycle.summary;

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Billing Management"
          description="Review monthly summaries, finalize meal rates, and monitor member payments."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <CycleSelector cycles={cycles} selectedId={activeCycle._id} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          icon={Utensils} 
          label="Total Meals" 
          value={summary.totalMeals} 
          subValue="Consumed this month"
          variant="info"
        />
        <SummaryCard 
          icon={Wallet} 
          label="Meal Expense" 
          value={`৳${summary.totalMealExpense}`} 
          subValue="Total grocery cost"
          variant="warning"
        />
        <SummaryCard 
          icon={TrendingUp} 
          label="Meal Rate" 
          value={`৳${summary.mealRate.toFixed(2)}`} 
          subValue="Calculated rate"
          variant="success"
        />
        <SummaryCard 
          icon={Receipt} 
          label="Shared Cost" 
          value={`৳${summary.totalEqualShareExpense}`} 
          subValue="Fixed costs per head"
          variant="default"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">Member Invoices</h3>
            <Badge variant={activeCycle.status === "finalized" ? "success" : "pending"} className="h-5 text-[10px] uppercase font-bold px-1.5">
              {activeCycle.status}
            </Badge>
          </div>
          <BillingActions cycle={activeCycle} messId={activeMessId} />
        </div>
        <DataTable 
          columns={columns} 
          data={bills} 
        />
      </div>
    </DashboardPageLayout>
  );
}

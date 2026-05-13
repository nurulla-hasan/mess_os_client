import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/utility/columns";
import { getUtilityBills } from "@/services/utility.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMessDetails } from "@/services/mess.service";
import {
  AlertCircle,
  Receipt,
  Clock,
  CheckCircle2,
  Wallet
} from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { SummaryCard } from "@/components/billing/summary-card";
import { AddUtilityBillModal } from "@/components/utility/add-utility-bill-modal";
import { format } from "date-fns";

export default async function ManagerUtilityBillsPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to manage utility bills.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  
  // Fetch bills and mess details in parallel
  const [billsRes, messRes] = await Promise.all([
    getUtilityBills(activeMessId, params),
    getMessDetails(activeMessId)
  ]);

  const bills = billsRes?.data || [];
  const mess = messRes?.data;
  
  // Get dynamic categories from mess settings (equalShareCategories)
  const dynamicCategories = mess?.settings?.equalShareCategories || [];

  // Summary logic
  const pendingBills = bills.filter(b => b.status === "unpaid");
  const paidBills = bills.filter(b => b.status === "paid");
  const totalAmount = bills.reduce((acc, curr) => acc + curr.amount, 0);
  
  const nextDueBill = pendingBills
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Utility Bills"
          description="Manage electricity, water, gas, and other shared mess utilities."
        />
        <div className="flex items-center gap-3">
          <AddUtilityBillModal messId={activeMessId} dynamicCategories={dynamicCategories} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={Clock}
          label="Pending Bills"
          value={pendingBills.length}
          subValue="Awaiting payment"
          variant="warning"
        />
        <SummaryCard
          icon={CheckCircle2}
          label="Paid Bills"
          value={paidBills.length}
          subValue="Successfully settled"
          variant="success"
        />
        <SummaryCard
          icon={Wallet}
          label="Total Amount"
          value={`৳${totalAmount}`}
          subValue="Cumulative cost"
          variant="info"
        />
        <SummaryCard
          icon={Receipt}
          label="Next Due"
          value={nextDueBill ? format(new Date(nextDueBill.dueDate), "dd MMM") : "None"}
          subValue={nextDueBill ? nextDueBill.category.toUpperCase() : "No pending bills"}
          variant="default"
        />
      </div>

      <DataTable
        columns={columns}
        data={bills}
      />
    </DashboardPageLayout>
  );
}

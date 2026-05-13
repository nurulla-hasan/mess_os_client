import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/payments/columns";
import { PaymentFilters } from "@/components/payments/payment-filters";
import { CreatePaymentModal } from "@/components/payments/create-payment-modal";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMyPayments } from "@/services/payment.service";
import { QueryParams, SearchParams } from "@/types/global.type";

export default async function MemberPaymentsPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to view your payments.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const { data, meta } = await getMyPayments(activeMessId, params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Payments"
          description="View your deposit history and submit new payment records for approval."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <PaymentFilters />
          <CreatePaymentModal messId={activeMessId} mode="member" />
        </div>
      </div>

      <DataTable columns={columns} data={data || []} meta={meta} />
    </DashboardPageLayout>
  );
}

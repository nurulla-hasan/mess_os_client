import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { AlertCircle, Plus } from "lucide-react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/payments/columns";
import { getPayments } from "@/services/payment.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { PaymentFilters } from "@/components/payments/payment-filters";
import { Button } from "@/components/ui/button";

export default async function ManagerPaymentsPage({
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
          <h2 className="text-lg font-bold tracking-tight">No Active Mess</h2>
          <p className="text-sm text-muted-foreground">Select a mess to view and manage payments.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  
  // Fetch payments from server with filters
  const { data, meta } = await getPayments(activeMessId, params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Mess Payments"
          description="View and manage all member payments, approve pending deposits, and track financial history."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <PaymentFilters />
          <Button className="w-full sm:w-auto shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" /> Add Payment
          </Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={data || []} 
        meta={meta} 
      />
    </DashboardPageLayout>
  );
}

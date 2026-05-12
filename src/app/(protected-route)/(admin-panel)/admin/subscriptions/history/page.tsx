import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { getAllSubscriptions } from "@/services/admin.service";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/admin/subscriptions/history-columns";
import { SubscriptionHistoryFilters } from "@/components/admin/subscriptions/subscription-history-filters";
import { QueryParams, SearchParams } from "@/types/global.type";

export default async function AdminSubscriptionHistoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = (await searchParams) as QueryParams;
  const { data, meta } = await getAllSubscriptions(params);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Subscription History"
          description="Comprehensive log of all mess subscriptions, renewals, and billing cycles across the platform."
        />
        <SubscriptionHistoryFilters />
      </div>

      <DataTable columns={columns} data={data} meta={meta} />
    </DashboardPageLayout>
  );
}

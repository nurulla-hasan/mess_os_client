import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/market/columns";
import {
  getMarketSchedules,
  getMyMarketDuties,
} from "@/services/market-schedule.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { AlertCircle, ShoppingCart, UserCheck } from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { MarketScheduleFilters } from "@/components/market/market-schedule-filters";
import { CreateMarketScheduleModal } from "@/components/market/create-market-schedule-modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default async function ManagerMarketSchedulesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <div className="flex flex-col items-center justify-center min-h-100 space-y-4 text-center">
          <AlertCircle className="h-10 w-10 text-muted-foreground opacity-20" />
          <h2 className="text-lg font-bold">No Active Mess</h2>
          <p className="text-sm text-muted-foreground">
            Select a mess to manage market schedules.
          </p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const scope = (typeof params.scope === "string" ? params.scope : params.scope?.[0]) || "all";
  const { data, meta } = await (scope === "my"
    ? getMyMarketDuties(activeMessId, params)
    : getMarketSchedules(activeMessId, params));

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Market Schedules"
          description="Plan and assign bazaar/shopping duties to mess members."
        />
        <div className="flex items-center gap-3">
          <MarketScheduleFilters />
          <CreateMarketScheduleModal messId={activeMessId} />
        </div>
      </div>

      <Tabs value={scope}>
        <TabsList variant="line">
          <Link href="?scope=all">
            <TabsTrigger value="all">
              <ShoppingCart />
              All History
            </TabsTrigger>
          </Link>
          <Link href="?scope=my">
            <TabsTrigger value="my">
              <UserCheck />
              My Duties
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      <DataTable columns={columns} data={data || []} meta={meta} />
    </DashboardPageLayout>
  );
}

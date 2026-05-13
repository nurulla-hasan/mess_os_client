import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/expenses/columns";
import { getMessExpenses, getMyExpenses } from "@/services/expense.service";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { AlertCircle, History, UserCircle } from "lucide-react";
import { SearchParams, QueryParams } from "@/types/global.type";
import { ExpenseFilters } from "@/components/expenses/expense-filters";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateExpenseModal } from "@/components/expenses/create-expense-modal";
import Link from "next/link";

export default async function ManagerExpensesPage({
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
          <p className="text-sm text-muted-foreground">Select a mess to view and manage expenses.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const view = (typeof params.view === "string" ? params.view : params.view?.[0]) || "all";

  // Filter out UI-only params before sending to API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { view: _view, ...apiParams } = params;
  
  const { data, meta } = await (view === "my" 
    ? getMyExpenses(activeMessId, apiParams)
    : getMessExpenses(activeMessId, apiParams));

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="Mess Expenses"
          description="Track and manage all mess expenditures, from daily bazaar to utility bills."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <ExpenseFilters />
          <CreateExpenseModal messId={activeMessId} mode="manager" />
        </div>
      </div>

      <Tabs value={view}>
        <TabsList variant="line">
          <Link href="?view=all">
            <TabsTrigger value="all">
              <History className="h-4 w-4" />
              All History
            </TabsTrigger>
          </Link>
          <Link href="?view=my">
            <TabsTrigger value="my">
              <UserCircle className="h-4 w-4" />
              My Expenses
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>

      <DataTable 
        columns={columns} 
        data={data || []} 
        meta={meta}
      />
    </DashboardPageLayout>
  );
}

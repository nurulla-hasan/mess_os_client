import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/expenses/columns";
import { 
  Receipt, 
  Clock, 
  CheckCircle2,
  Wallet,
  ArrowDownRight,
  AlertCircle
} from "lucide-react";
import { getActiveMessIdFromCookies } from "@/services/auth.service";
import { getMyExpenses } from "@/services/expense.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { CreateExpenseModal } from "@/components/expenses/create-expense-modal";
import { ExpenseFilters } from "@/components/expenses/expense-filters";
import Link from "next/link";

export default async function MemberExpensesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader
          title="My Expenses"
          description="Track mess-related expenses you've paid."
        />
        <div className="mt-6 p-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex gap-3">
          <AlertCircle className="h-5 w-5 text-primary shrink-0" />
          <div className="space-y-1">
            <p className="text-sm font-medium">No Active Mess</p>
            <p className="text-xs text-muted-foreground">
              Please join a mess to view and manage expenses.
            </p>
          </div>
        </div>
      </DashboardPageLayout>
    );
  }

  const params = (await searchParams) as QueryParams;
  const statusFilter = (typeof params.status === "string" ? params.status : params.status?.[0]) || "all";
  
  // Filter out UI-only params before sending to API
  const apiParams = { ...params };
  if (statusFilter === "all") delete apiParams.status;
  
  const { data, meta } = await getMyExpenses(activeMessId, apiParams);
  const expenses = data || [];

  const totalApproved = expenses.filter(e => e.status === "approved").reduce((acc, e) => acc + e.amount, 0);
  const totalPending = expenses.filter(e => e.status === "pending").reduce((acc, e) => acc + e.amount, 0);
  const totalReimbursed = expenses.filter(e => e.reimbursementStatus === "reimbursed").reduce((acc, e) => acc + e.amount, 0);

  return (
    <DashboardPageLayout>
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-3">
        <DashboardPageHeader
          title="My Expenses"
          description="Track mess-related expenses you've paid and manage reimbursement status."
        />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <ExpenseFilters />
          <CreateExpenseModal messId={activeMessId} mode="member" />
        </div>
      </div>

      {/* Expense Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-rose-500/5 border-rose-500/20 shadow-none">
          <CardContent className="flex flex-col gap-1 p-4">
            <div className="flex items-center gap-3 text-rose-500">
              <Wallet className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Total Approved</span>
            </div>
            <p className="text-xl font-bold">৳{totalApproved.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20 shadow-none">
          <CardContent className="flex flex-col gap-1 p-4">
            <div className="flex items-center gap-3 text-amber-500">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Pending Approval</span>
            </div>
            <p className="text-xl font-bold">৳{totalPending.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20 shadow-none">
          <CardContent className="flex flex-col gap-1 p-4">
            <div className="flex items-center gap-3 text-emerald-500">
              <ArrowDownRight className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Reimbursed</span>
            </div>
            <p className="text-xl font-bold">৳{totalReimbursed.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Tabs value={statusFilter} className="w-full">
          <TabsList variant="line">
            <Link href="?status=all">
              <TabsTrigger value="all" className="flex items-center gap-3">
                <Receipt className="h-4 w-4" />
                <span>All History</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=pending">
              <TabsTrigger value="pending" className="flex items-center gap-3 text-amber-500">
                <Clock className="h-4 w-4" />
                <span>Pending</span>
              </TabsTrigger>
            </Link>
            <Link href="?status=approved">
              <TabsTrigger value="approved" className="flex items-center gap-3 text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                <span>Approved</span>
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
 
        <DataTable columns={columns} data={expenses} meta={meta} />
      </div>
    </DashboardPageLayout>
  );
}

import { ExpensesReportView } from "@/components/reports/expenses-report-view";
import { FinancialReportView } from "@/components/reports/financial-report-view";
import { PaymentsReportView } from "@/components/reports/payments-report-view";
import { ReportSidebar } from "@/components/reports/report-sidebar";
import { StatementReportView } from "@/components/reports/statement-report-view";
import { SummaryReportView } from "@/components/reports/summary-report-view";
import DashboardPageHeader from "@/components/ui/custom/dashboard-page-header";
import DashboardPageLayout from "@/components/ui/custom/dashboard-page-layout";
import { getActiveMessIdFromCookies, getMe } from "@/services/auth.service";
import { 
  getReportSummary, 
  getFinancialReport, 
  getMemberStatement, 
  getExpensesReport, 
  getPaymentsReport 
} from "@/services/report.service";
import { SearchParams, QueryParams } from "@/types/global.type";
import { 
  IReportSummary, 
  IFinancialReport, 
  IMemberStatement,
  IExpensesReport,
  IPaymentsReport
} from "@/types/report.type";
import { AlertCircle, FileText } from "lucide-react";
import { Suspense } from "react";

export default async function MemberReportsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const activeMessId = await getActiveMessIdFromCookies();

  if (!activeMessId) {
    return (
      <DashboardPageLayout>
        <DashboardPageHeader title="Reports" description="View mess reports." />
        <div className="mt-10 flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl bg-muted/30">
          <AlertCircle className="h-10 w-10 text-muted-foreground opacity-20 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Active Mess</h2>
          <p className="text-muted-foreground">Select a mess to view reports.</p>
        </div>
      </DashboardPageLayout>
    );
  }

  const userRes = await getMe();
  const user = userRes.data;
  const currentMembership = user?.memberships?.find(m => 
    (typeof m.messId === 'string' ? m.messId : m.messId?._id) === activeMessId
  );
  
  const memberId = currentMembership?._id;
  const role = (currentMembership?.messRole as "manager" | "member") || "member";
  const isManager = role === "manager";

  const params = (await searchParams) as QueryParams;
  const type = (typeof params.type === "string" ? params.type : params.type?.[0]) || "summary";
  
  // Create a clean params object for API calls by removing UI-only fields
  const apiParams = { ...params };
  delete apiParams.type;
  delete apiParams.memberId;
  delete apiParams.month;
  delete apiParams.year;

  let reportData: IReportSummary | IMemberStatement | IExpensesReport | IPaymentsReport | IFinancialReport | null = null;

  try {
    if (type === "summary") {
      const res = await getReportSummary(activeMessId);
      reportData = res.data;
    } else if (type === "statement" && memberId) {
      const targetMemberId = (isManager && params.memberId && typeof params.memberId === "string") 
        ? params.memberId 
        : memberId;
      const res = await getMemberStatement(activeMessId, targetMemberId);
      reportData = res.data;
    } else if (type === "expenses") {
      const res = await getExpensesReport(activeMessId, isManager ? apiParams : { ...apiParams, scope: "my" });
      reportData = res.data;
    } else if (type === "payments") {
      const res = await getPaymentsReport(activeMessId, isManager ? apiParams : { ...apiParams, scope: "my" });
      reportData = res.data;
    } else if (type === "financial") {
      const now = new Date();
      const month = params.month ? parseInt(params.month as string) : now.getMonth() + 1;
      const year = params.year ? parseInt(params.year as string) : now.getFullYear();
      const res = await getFinancialReport(activeMessId, month, year);
      reportData = res.data;
    }
  } catch (error) {
    console.error("Report Fetch Error:", error);
  }

  return (
    <DashboardPageLayout>
      <DashboardPageHeader
        title={isManager ? "Mess Reports & Statements" : "My Statements & Reports"}
        description={isManager 
          ? "Comprehensive operational and financial reports for mess management." 
          : "View your personal financial statements and operational summaries."
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Selector */}
        <div className="lg:col-span-1">
          <ReportSidebar activeType={type} role={role} />
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3 min-h-[500px]">
          {!reportData ? (
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed rounded-2xl bg-muted/20">
              <FileText className="h-10 w-10 text-muted-foreground/20 mb-4" />
              <h3 className="text-sm font-bold text-muted-foreground">No data available for this report.</h3>
            </div>
          ) : (
            <Suspense fallback={<div className="flex items-center justify-center p-20">Loading report...</div>}>
              {type === "summary" && <SummaryReportView data={reportData as IReportSummary} role={role} />}
              {type === "statement" && <StatementReportView data={reportData as IMemberStatement} role={role} />}
              {type === "expenses" && <ExpensesReportView data={reportData as IExpensesReport} role={role} />}
              {type === "payments" && <PaymentsReportView data={reportData as IPaymentsReport} role={role} />}
              {type === "financial" && <FinancialReportView data={reportData as IFinancialReport} role={role} />}
            </Suspense>
          )}
        </div>
      </div>
    </DashboardPageLayout>
  );
}

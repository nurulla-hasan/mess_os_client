"use client";

import { useEffect, useState, useTransition, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Download, 
  Filter, 
  UserCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMemberOption } from "@/types/member.type";
import { SuccessToast, ErrorToast} from "@/lib/utils";
import { 
  getReportSummary, 
  getFinancialReport, 
  getMemberStatement, 
  getExpensesReport, 
  getPaymentsReport,
  exportReportsCsv
} from "@/services/report.service";
import { 
  IReportSummary, 
  IFinancialReport, 
  IMemberStatement, 
  IExpensesReport, 
  IPaymentsReport 
} from "@/types/report.type";
import { useSmartFilter } from "@/hooks/useSmartFilter";

// Modular Views
import { SummaryView } from "./summary-view";
import { FinancialLedgerView } from "./financial-ledger-view";
import { TransactionsView } from "./transactions-view";
import { MemberStatementView } from "./member-statement-view";

interface ReportsContentProps {
  messId: string;
  memberOptions: IMemberOption[];
}

type ReportType = "summary" | "financial" | "members" | "expenses" | "payments";

export function ReportsContent({ messId, memberOptions }: ReportsContentProps) {
  const { getFilter, updateFilter } = useSmartFilter();
  
  // URL-driven filters
  const reportType = (getFilter("type") as ReportType) || "summary";
  const month = parseInt(getFilter("month")) || new Date().getMonth() + 1;
  const year = parseInt(getFilter("year")) || new Date().getFullYear();
  const selectedMember = getFilter("member") || "";
  
  const [data, setData] = useState<
    IReportSummary | IFinancialReport | IMemberStatement | IExpensesReport | IPaymentsReport | null
  >(null);
  const [isPending, startTransition] = useTransition();

  const fetchReport = useCallback(async () => {
    startTransition(async () => {
      setData(null); // Clear previous data to avoid type mismatch during loading
      let res;
      try {
        switch (reportType) {
          case "summary":
            res = await getReportSummary(messId);
            break;
          case "financial":
            res = await getFinancialReport(messId, month, year);
            break;
          case "members":
            if (!selectedMember) {
              setData(null);
              return;
            }
            res = await getMemberStatement(messId, selectedMember);
            break;
          case "expenses":
            res = await getExpensesReport(messId, { month: month.toString(), year: year.toString() });
            break;
          case "payments":
            res = await getPaymentsReport(messId, { month: month.toString(), year: year.toString() });
            break;
        }

        if (res?.success) {
          setData(res.data);
        } else {
          setData(null);
          if (res?.message) ErrorToast(res.message);
        }
      } catch {
        ErrorToast("Failed to generate report.");
      }
    });
  }, [messId, reportType, month, year, selectedMember]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleExport = async () => {
    if (reportType !== "expenses" && reportType !== "payments") {
      ErrorToast("Export only available for Expenses or Payments.");
      return;
    }
    
    try {
      const csv = await exportReportsCsv(messId, { type: reportType, month: month.toString(), year: year.toString() });
      if (csv) {
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${reportType}-report-${month}-${year}.csv`;
        a.click();
        SuccessToast("Export successful!");
      }
    } catch {
      ErrorToast("Failed to export CSV.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Report Selector & Filters */}
      <div className="lg:col-span-1 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              Report Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-muted-foreground">Report Type</p>
              <Select value={reportType} onValueChange={(v) => updateFilter("type", v)}>
                <SelectTrigger className="w-full h-9">
                  <SelectValue placeholder="Select Report" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Operational Summary</SelectItem>
                  <SelectItem value="financial">Financial Ledger</SelectItem>
                  <SelectItem value="members">Member Statements</SelectItem>
                  <SelectItem value="expenses">Expense Analytics</SelectItem>
                  <SelectItem value="payments">Payment History</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(reportType === "financial" || reportType === "expenses" || reportType === "payments") && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Month</p>
                  <Select value={month.toString()} onValueChange={(v) => updateFilter("month", v)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          {new Date(0, i).toLocaleString('default', { month: 'long' })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-muted-foreground">Year</p>
                  <Select value={year.toString()} onValueChange={(v) => updateFilter("year", v)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[2024, 2025, 2026].map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {reportType === "members" && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">Select Member</p>
                <Select value={selectedMember} onValueChange={(v) => updateFilter("member", v)}>
                  <SelectTrigger className="h-9">
                    <UserCircle className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    <SelectValue placeholder="Select Member" />
                  </SelectTrigger>
                  <SelectContent>
                    {memberOptions.map((m) => (
                      <SelectItem key={m._id} value={m._id}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button 
              className="w-full mt-2" 
              onClick={fetchReport} 
              disabled={isPending}
            >
              {isPending ? "Generating..." : "Refresh Report"}
            </Button>

            {(reportType === "expenses" || reportType === "payments") && (
              <Button 
                variant="outline" 
                className="w-full border-primary/20 text-primary hover:bg-primary/5"
                onClick={handleExport}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Preview Area */}
      <div className="lg:col-span-3 space-y-6">
        {reportType === "summary" && <SummaryView summary={data as IReportSummary || { totalMessCash: 0, pendingExpenses: 0, pendingPayments: 0, finalizedCycles: 0 }} isLoading={isPending} />}
        {reportType === "financial" && <FinancialLedgerView report={data as IFinancialReport} isLoading={isPending} />}
        {reportType === "members" && <MemberStatementView statement={data as IMemberStatement} isLoading={isPending} />}
        {reportType === "expenses" && <TransactionsView type="expenses" data={data as IExpensesReport} isLoading={isPending} />}
        {reportType === "payments" && <TransactionsView type="payments" data={data as IPaymentsReport} isLoading={isPending} />}
      </div>
    </div>
  );
}

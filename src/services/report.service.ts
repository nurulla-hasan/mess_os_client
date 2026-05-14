"use server";

import { serverFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/global.type";
import { 
  IReportSummary, 
  IFinancialReport, 
  IMemberStatement,
  IExpensesReport,
  IPaymentsReport
} from "@/types/report.type";
import { QueryParams } from "@/types/global.type";
import { buildQueryString } from "@/lib/buildQueryString";

/**
 * Get overall reports summary for a mess
 */
export const getReportSummary = async (
  messId: string
): Promise<ApiResponse<IReportSummary>> => {
  try {
    return (await serverFetch(`/messes/${messId}/reports/summary`, {
      method: "GET",
      tags: ["reports", "summary"],
    })) as ApiResponse<IReportSummary>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch summary.",
      data: null as unknown as IReportSummary,
    };
  }
};

/**
 * Get monthly financial report
 */
export const getFinancialReport = async (
  messId: string,
  month: number,
  year: number
): Promise<ApiResponse<IFinancialReport>> => {
  try {
    return (await serverFetch(`/messes/${messId}/reports/financial?month=${month}&year=${year}`, {
      method: "GET",
      tags: ["reports", "financial"],
    })) as ApiResponse<IFinancialReport>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch financial report.",
      data: null as unknown as IFinancialReport,
    };
  }
};

/**
 * Get member statement
 */
export const getMemberStatement = async (
  messId: string,
  memberId: string
): Promise<ApiResponse<IMemberStatement>> => {
  try {
    return (await serverFetch(`/messes/${messId}/reports/members/${memberId}`, {
      method: "GET",
      tags: ["reports", "member-statement"],
    })) as ApiResponse<IMemberStatement>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch member statement.",
      data: null as unknown as IMemberStatement,
    };
  }
};

/**
 * Get expenses report
 */
export const getExpensesReport = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IExpensesReport>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/reports/expenses${qs}`, {
      method: "GET",
      tags: ["reports", "expenses"],
    })) as ApiResponse<IExpensesReport>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch expenses report.",
      data: null as unknown as IExpensesReport,
    };
  }
};

/**
 * Get payments report
 */
export const getPaymentsReport = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IPaymentsReport>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/reports/payments${qs}`, {
      method: "GET",
      tags: ["reports", "payments"],
    })) as ApiResponse<IPaymentsReport>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch payments report.",
      data: null as unknown as IPaymentsReport,
    };
  }
};

/**
 * Export reports as CSV
 */
export const exportReportsCsv = async (
  messId: string,
  params: QueryParams = {}
): Promise<string | null> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/reports/export/csv${qs}`, {
      method: "GET",
      responseType: "text",
    })) as string;
  } catch (error: unknown) {
    console.error("CSV Export Error:", error);
    return null;
  }
};

"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IExpense, CreateExpensePayload } from "@/types/expense.type";

/**
 * List all expenses for a specific mess with optional filters
 */
export const getMessExpenses = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IExpense[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/expenses${qs}`, {
      method: "GET",
      tags: ["expenses"],
    })) as ApiResponse<IExpense[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch expenses.",
      data: [],
    };
  }
};

/**
 * Get expenses for the current user in a mess
 */
export const getMyExpenses = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IExpense[]>> => {
  const qs = buildQueryString({ ...params, scope: "my" });
  try {
    return (await serverFetch(`/messes/${messId}/expenses${qs}`, {
      method: "GET",
      tags: ["expenses"],
    })) as ApiResponse<IExpense[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch your expenses.",
      data: [],
    };
  }
};

/**
 * Create a new expense
 */
export const createExpense = async (
  messId: string,
  data: CreateExpensePayload
): Promise<ApiResponse<IExpense>> => {
  try {
    return (await serverFetch(`/messes/${messId}/expenses`, {
      method: "POST",
      body: data,
      updateTag: ["expenses", "dashboard-stats"],
    })) as ApiResponse<IExpense>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create expense.",
      data: null as unknown as IExpense,
    };
  }
};

/**
 * Get a specific expense by ID
 */
export const getExpenseById = async (
  messId: string,
  expenseId: string
): Promise<ApiResponse<IExpense>> => {
  try {
    return (await serverFetch(`/messes/${messId}/expenses/${expenseId}`, {
      method: "GET",
      tags: ["expenses"],
    })) as ApiResponse<IExpense>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch expense details.",
      data: null as unknown as IExpense,
    };
  }
};

/**
 * Approve or reject an expense
 */
export const updateExpenseStatus = async (
  messId: string,
  expenseId: string,
  status: "approved" | "rejected" | "canceled"
): Promise<ApiResponse<IExpense>> => {
  try {
    return (await serverFetch(`/messes/${messId}/expenses/${expenseId}/status`, {
      method: "PATCH",
      body: { status },
      updateTag: ["expenses", "dashboard-stats"],
    })) as ApiResponse<IExpense>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update expense status.",
      data: null as unknown as IExpense,
    };
  }
};

/**
 * Mark an expense as reimbursed (Manager Only)
 */
export const reimburseExpense = async (
  messId: string,
  expenseId: string
): Promise<ApiResponse<IExpense>> => {
  try {
    return (await serverFetch(`/messes/${messId}/expenses/${expenseId}/reimburse`, {
      method: "POST",
      updateTag: ["expenses", "dashboard-stats"],
    })) as ApiResponse<IExpense>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to reimburse expense.",
      data: null as unknown as IExpense,
    };
  }
};

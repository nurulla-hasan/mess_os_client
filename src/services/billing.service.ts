"use server";

import { serverFetch, ApiError } from "@/lib/fetcher";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IBillingCycle, IMemberBill } from "@/types/billing.type";
import { buildQueryString } from "@/lib/buildQueryString";

/**
 * Get all billing cycles for a mess
 */
export const getBillingCycles = async (
  messId: string
): Promise<ApiResponse<IBillingCycle[]>> => {
  try {
    return (await serverFetch(`/messes/${messId}/billing`, {
      method: "GET",
      tags: ["billing"],
    })) as ApiResponse<IBillingCycle[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch billing cycles.",
      data: [],
      status: (error as ApiError)?.status,
    };
  }
};

/**
 * Get all member bills for a specific billing cycle
 */
export const getMemberBills = async (
  messId: string,
  billingCycleId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMemberBill[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/billing/${billingCycleId}/members${qs}`, {
      method: "GET",
      tags: ["billing"],
    })) as ApiResponse<IMemberBill[]>;
    } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch member bills.",
      data: [],
      status: (error as ApiError)?.status,
    };
  }
};

/**
 * Get specific bill for the currently logged-in user
 */
export const getMyBill = async (
  messId: string,
  billingCycleId: string
): Promise<ApiResponse<IMemberBill>> => {
  try {
    return (await serverFetch(`/messes/${messId}/billing/${billingCycleId}/my-bill`, {
      method: "GET",
      tags: ["billing"],
    })) as ApiResponse<IMemberBill>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch your bill details.",
      data: null as unknown as IMemberBill,
      status: (error as ApiError)?.status,
    };
  }
};

/**
 * Preview billing for a specific month/year
 */
export const previewBilling = async (
  messId: string,
  data: { month: number; year: number }
): Promise<ApiResponse<IBillingCycle>> => {
  try {
    return (await serverFetch(`/messes/${messId}/billing/preview`, {
      method: "POST",
      body: data,
    })) as ApiResponse<IBillingCycle>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to preview billing.",
      data: null as unknown as IBillingCycle,
      status: (error as ApiError)?.status,
    };
  }
};

/**
 * Finalize billing for a specific month/year
 */
export const finalizeBilling = async (
  messId: string,
  data: { month: number; year: number }
): Promise<ApiResponse<IBillingCycle>> => {
  try {
    return (await serverFetch(`/messes/${messId}/billing/finalize`, {
      method: "POST",
      body: data,
      updateTag: ["billing", "dashboard-stats"],
    })) as ApiResponse<IBillingCycle>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to finalize billing.",
      data: null as unknown as IBillingCycle,
      status: (error as ApiError)?.status,
    };
  }
};

/**
 * Reopen a finalized billing cycle
 */
export const reopenBilling = async (
  messId: string,
  billingCycleId: string
): Promise<ApiResponse<IBillingCycle>> => {
  try {
    return (await serverFetch(`/messes/${messId}/billing/${billingCycleId}/reopen`, {
      method: "POST",
      updateTag: ["billing", "dashboard-stats"],
    })) as ApiResponse<IBillingCycle>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to reopen billing.",
      data: null as unknown as IBillingCycle,
      status: (error as ApiError)?.status,
    };
  }
};

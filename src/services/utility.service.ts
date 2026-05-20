"use server";

import { serverFetch } from "@/lib/fetcher";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IUtilityBill } from "@/types/utility.type";
import { buildQueryString } from "@/lib/buildQueryString";

/**
 * Get all utility bills for a mess
 */
export const getUtilityBills = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IUtilityBill[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/utility-bills${qs}`, {
      method: "GET",
      tags: ["utility-bills"],
    })) as ApiResponse<IUtilityBill[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch utility bills.",
      data: [],
    };
  }
};

/**
 * Create a new utility bill
 */
export const createUtilityBill = async (
  messId: string,
  data: Partial<IUtilityBill>
): Promise<ApiResponse<IUtilityBill>> => {
  try {
    return (await serverFetch(`/messes/${messId}/utility-bills`, {
      method: "POST",
      body: data,
      updateTag: ["utility-bills", "dashboard-stats"],
    })) as ApiResponse<IUtilityBill>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create utility bill.",
      data: null as unknown as IUtilityBill,
    };
  }
};

/**
 * Update an unpaid utility bill
 */
export const updateUtilityBill = async (
  messId: string,
  billId: string,
  data: Partial<IUtilityBill>
): Promise<ApiResponse<IUtilityBill>> => {
  try {
    return (await serverFetch(`/messes/${messId}/utility-bills/${billId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["utility-bills", "dashboard-stats"],
    })) as ApiResponse<IUtilityBill>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update utility bill.",
      data: null as unknown as IUtilityBill,
    };
  }
};

/**
 * Mark a utility bill as paid
 */
export const payUtilityBill = async (
  messId: string,
  billId: string
): Promise<ApiResponse<IUtilityBill>> => {
  try {
    return (await serverFetch(`/messes/${messId}/utility-bills/${billId}/pay`, {
      method: "POST",
      updateTag: ["utility-bills", "dashboard-stats"],
    })) as ApiResponse<IUtilityBill>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to pay utility bill.",
      data: null as unknown as IUtilityBill,
    };
  }
};


"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IMealBreakdown, IMeal } from "@/types/meal.type";

interface LogMealPayload {
  messMemberId: string;
  date: string;
  meals: IMealBreakdown;
}

interface BulkLogMealPayload {
  date: string;
  entries: { messMemberId: string; meals: IMealBreakdown }[];
}

/**
 * List all meals for a specific mess with optional filters
 */
export const getMessMeals = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMeal[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/meals${qs}`, {
      method: "GET",
      tags: ["meals"],
    })) as ApiResponse<IMeal[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch meals.",
      data: [],
    };
  }
};

/**
 * Log a new meal
 */
export const logMeal = async (
  messId: string,
  data: LogMealPayload
): Promise<ApiResponse<IMeal>> => {
  try {
    return (await serverFetch(`/messes/${messId}/meals`, {
      method: "POST",
      body: data,
      updateTag: ["meals"],
    })) as ApiResponse<IMeal>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to log meal.",
      data: null as unknown as IMeal,
    };
  }
};

/**
 * Bulk log meals for multiple members
 */
export const bulkLogMeals = async (
  messId: string,
  data: BulkLogMealPayload
): Promise<ApiResponse<{ processed: number }>> => {
  try {
    return (await serverFetch(`/messes/${messId}/meals/bulk`, {
      method: "POST",
      body: data,
      updateTag: ["meals"],
    })) as ApiResponse<{ processed: number }>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to bulk log meals.",
      data: null as unknown as { processed: number },
    };
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";
import { IMealBreakdown } from "@/types/meal.type";

/**
 * List all meals for a specific mess with optional filters
 */
export const getMessMeals = async (messId: string, params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/messes/${messId}/meals${qs}`, {
      method: "GET",
      tags: ["meals"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch meals.",
    };
  }
};

/**
 * Log a new meal
 */
export const logMeal = async (messId: string, data: { messMemberId: string; date: string; meals: IMealBreakdown }): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/meals`, {
      method: "POST",
      body: data,
      updateTag: ["meals"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to log meal.",
    };
  }
};

/**
 * Bulk log meals for multiple members
 */
export const bulkLogMeals = async (messId: string, data: { date: string; entries: { messMemberId: string; meals: IMealBreakdown }[] }): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/meals/bulk`, {
      method: "POST",
      body: data,
      updateTag: ["meals"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to bulk log meals.",
    };
  }
};

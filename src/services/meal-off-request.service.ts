/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";
import { MealOffRequestStatus } from "@/types/meal-off-request.type";

/**
 * List all meal off requests for a mess with optional filters
 */
export const getMessMealOffRequests = async (messId: string, params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/messes/${messId}/meal-off-requests${qs}`, {
      method: "GET",
      tags: ["meal-off-requests"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch meal off requests.",
    };
  }
};

/**
 * Review/Update meal off request status
 */
export const updateMealOffRequestStatus = async (
  messId: string,
  requestId: string,
  data: { status: MealOffRequestStatus; adminNote?: string }
): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/meal-off-requests/${requestId}/status`, {
      method: "PATCH",
      body: data,
      updateTag: ["meal-off-requests"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update request status.",
    };
  }
};

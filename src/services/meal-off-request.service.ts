"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { MealOffRequestStatus, IMealOffRequest } from "@/types/meal-off-request.type";

interface UpdateMealOffRequestStatusPayload {
  status: MealOffRequestStatus;
  adminNote?: string;
}

/**
 * List all meal off requests for a mess with optional filters
 */
export const getMessMealOffRequests = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMealOffRequest[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/meal-off-requests${qs}`, {
      method: "GET",
      tags: ["meal-off-requests"],
    })) as ApiResponse<IMealOffRequest[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch meal off requests.",
      data: [],
    };
  }
};

export interface CreateMealOffRequestPayload {
  startDate: string;
  endDate: string;
  meals?: string[];
  reason: string;
}

/**
 * Review/Update meal off request status
 */
export const updateMealOffRequestStatus = async (
  messId: string,
  requestId: string,
  data: UpdateMealOffRequestStatusPayload
): Promise<ApiResponse<IMealOffRequest>> => {
  try {
    return (await serverFetch(`/messes/${messId}/meal-off-requests/${requestId}/status`, {
      method: "PATCH",
      body: data,
      updateTag: ["meal-off-requests"],
    })) as ApiResponse<IMealOffRequest>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update request status.",
      data: null as unknown as IMealOffRequest,
    };
  }
};

/**
 * Create a new meal off request
 */
export const createMealOffRequest = async (
  messId: string,
  data: CreateMealOffRequestPayload
): Promise<ApiResponse<IMealOffRequest>> => {
  try {
    return (await serverFetch(`/messes/${messId}/meal-off-requests`, {
      method: "POST",
      body: data,
      updateTag: ["meal-off-requests"],
    })) as ApiResponse<IMealOffRequest>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create meal off request.",
      data: null as unknown as IMealOffRequest,
    };
  }
};
/**
 * Get meal off requests for the current user
 */
export const getMyMealOffRequests = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMealOffRequest[]>> => {
  const qs = buildQueryString({ ...params, scope: "my" });
  try {
    return (await serverFetch(`/messes/${messId}/meal-off-requests${qs}`, {
      method: "GET",
      tags: ["meal-off-requests"],
    })) as ApiResponse<IMealOffRequest[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch your meal off requests.",
      data: [],
    };
  }
};

/**
 * Cancel a pending meal off request (own request)
 */
export const cancelMealOffRequest = async (
  messId: string,
  requestId: string
): Promise<ApiResponse<IMealOffRequest>> => {
  try {
    return (await serverFetch(
      `/messes/${messId}/meal-off-requests/${requestId}/cancel`,
      {
        method: "PATCH",
        updateTag: ["meal-off-requests"],
      }
    )) as ApiResponse<IMealOffRequest>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to cancel meal off request.",
      data: null as unknown as IMealOffRequest,
    };
  }
};

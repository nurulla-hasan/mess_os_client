"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IMarketSchedule } from "@/types/market-schedule.type";

// â”€â”€â”€ Request Payload Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

interface ShoppingItemPayload {
  name: string;
  quantity: string;
}

interface CreateMarketSchedulePayload {
  assignedTo: string[];
  targetDate: string;
  estimatedBudget: number;
  shoppingItems: ShoppingItemPayload[];
}

interface UpdateMarketSchedulePayload {
  assignedTo?: string[];
  targetDate?: string;
  estimatedBudget?: number;
  shoppingItems?: ShoppingItemPayload[];
}

interface UpdateMarketScheduleStatusPayload {
  status: "completed" | "void";
  actualSpent?: number;
  fundSource?: string;
}

// â”€â”€â”€ Service Functions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Get market schedules of a specific mess
 */
export const getMarketSchedules = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMarketSchedule[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/market-schedules${qs}`, {
      method: "GET",
      tags: ["market-schedules"],
    })) as ApiResponse<IMarketSchedule[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch market schedules.",
      data: [],
    };
  }
};

/**
 * Get market duties assigned to the current user
 */
export const getMyMarketDuties = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMarketSchedule[]>> => {
  const qs = buildQueryString({ ...params, scope: "my" });
  try {
    return (await serverFetch(`/messes/${messId}/market-schedules${qs}`, {
      method: "GET",
      tags: ["market-schedules"],
    })) as ApiResponse<IMarketSchedule[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch my market duties.",
      data: [],
    };
  }
};

/**
 * Create a new market schedule
 */
export const createMarketSchedule = async (
  messId: string,
  data: CreateMarketSchedulePayload
): Promise<ApiResponse<IMarketSchedule>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-schedules`, {
      method: "POST",
      body: data,
      updateTag: ["market-schedules"],
    })) as ApiResponse<IMarketSchedule>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create market schedule.",
      data: null as unknown as IMarketSchedule,
    };
  }
};

/**
 * Update an existing market schedule (assignees, items, date, budget)
 */
export const updateMarketSchedule = async (
  messId: string,
  scheduleId: string,
  data: UpdateMarketSchedulePayload
): Promise<ApiResponse<IMarketSchedule>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-schedules/${scheduleId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["market-schedules"],
    })) as ApiResponse<IMarketSchedule>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update market schedule.",
      data: null as unknown as IMarketSchedule,
    };
  }
};

/**
 * Update the status of a market schedule (completed / void)
 * actorMessMemberId is resolved by the backend from the JWT token.
 */
export const updateMarketScheduleStatus = async (
  messId: string,
  scheduleId: string,
  data: UpdateMarketScheduleStatusPayload
): Promise<ApiResponse<IMarketSchedule>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-schedules/${scheduleId}/status`, {
      method: "PATCH",
      body: data,
      updateTag: ["market-schedules"],
    })) as ApiResponse<IMarketSchedule>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update market schedule status.",
      data: null as unknown as IMarketSchedule,
    };
  }
};


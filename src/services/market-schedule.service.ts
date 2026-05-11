/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";

/**
 * Get market schedules of a specific mess
 */
export const getMarketSchedules = async (messId: string, params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/messes/${messId}/market-schedules${qs}`, {
      method: "GET",
      tags: ["market-schedules"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch market schedules.",
    };
  }
};

/**
 * Create a new market schedule
 */
export const createMarketSchedule = async (messId: string, data: any): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/market-schedules`, {
      method: "POST",
      body: data,
      updateTag: ["market-schedules"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to create market schedule.",
    };
  }
};

/**
 * Get market duties assigned to the current user
 */
export const getMyMarketDuties = async (messId: string, params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/messes/${messId}/market-schedules/my-duties${qs}`, {
      method: "GET",
      tags: ["market-schedules"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch my market duties.",
    };
  }
};

/**
 * Update an existing market schedule
 */
export const updateMarketSchedule = async (messId: string, scheduleId: string, data: any): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/market-schedules/${scheduleId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["market-schedules"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update market schedule.",
    };
  }
};

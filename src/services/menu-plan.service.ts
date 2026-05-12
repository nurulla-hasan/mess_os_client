"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IMenuPlan } from "@/types/menu-plan.type";

/**
 * Get menu plans for a specific mess with filters
 */
export const getMenuPlans = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IMenuPlan[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/menu-plans${qs}`, {
      method: "GET",
      tags: ["menu-plans"],
    })) as ApiResponse<IMenuPlan[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch menu plans.",
      data: [],
    };
  }
};

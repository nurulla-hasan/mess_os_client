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

/**
 * Create a new menu plan
 */
export const createMenuPlan = async (
  messId: string,
  data: { 
    date: string; 
    meals?: Record<string, string>; 
    isAiGenerated?: boolean;
    aiPreference?: string;
    aiBudget?: number;
    aiPersonCount?: number;
    aiShoppingDays?: number;
    avoidRecentDays?: number;
  }
): Promise<ApiResponse<IMenuPlan>> => {
  try {
    return (await serverFetch(`/messes/${messId}/menu-plans`, {
      method: "POST",
      body: data,
      updateTag: ["menu-plans"],
    })) as ApiResponse<IMenuPlan>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create menu plan.",
      data: null as unknown as IMenuPlan,
    };
  }
};

/**
 * Update menu plan meals
 */
export const updateMenuPlan = async (
  messId: string,
  planId: string,
  data: { meals: Record<string, string> }
): Promise<ApiResponse<IMenuPlan>> => {
  try {
    return (await serverFetch(`/messes/${messId}/menu-plans/${planId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["menu-plans"],
    })) as ApiResponse<IMenuPlan>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update menu plan.",
      data: null as unknown as IMenuPlan,
    };
  }
};

/**
 * Update menu plan status (published | archived)
 */
export const updateMenuPlanStatus = async (
  messId: string,
  planId: string,
  status: "published" | "archived"
): Promise<ApiResponse<IMenuPlan>> => {
  try {
    return (await serverFetch(`/messes/${messId}/menu-plans/${planId}/status`, {
      method: "PATCH",
      body: { status },
      updateTag: ["menu-plans"],
    })) as ApiResponse<IMenuPlan>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update menu plan status.",
      data: null as unknown as IMenuPlan,
    };
  }
};

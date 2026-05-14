"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { ApiResponse, QueryParams } from "@/types/global.type";
import { IAiShoppingList, AiShoppingStatus } from "@/types/ai-shopping.type";
import { IMarketSchedule } from "@/types/market-schedule.type";

interface GenerateAiShoppingListPayload {
  menuPlanId: string;
  targetDate: string;
}

interface ConvertAiShoppingListPayload {
  assignedTo: string[];
  estimatedBudget: number;
}

export const getAiShoppingLists = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IAiShoppingList[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/ai-shopping${qs}`, {
      method: "GET",
      tags: ["ai-shopping", "market-schedules"],
    })) as ApiResponse<IAiShoppingList[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch AI shopping lists.",
      data: [],
    };
  }
};

export const getAiShoppingListById = async (
  messId: string,
  listId: string
): Promise<ApiResponse<IAiShoppingList>> => {
  try {
    return (await serverFetch(`/messes/${messId}/ai-shopping/${listId}`, {
      method: "GET",
      tags: ["ai-shopping"],
    })) as ApiResponse<IAiShoppingList>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch AI shopping list.",
      data: null as unknown as IAiShoppingList,
    };
  }
};

export const generateAiShoppingList = async (
  messId: string,
  data: GenerateAiShoppingListPayload
): Promise<ApiResponse<IAiShoppingList>> => {
  try {
    return (await serverFetch(`/messes/${messId}/ai-shopping/generate`, {
      method: "POST",
      body: data,
      updateTag: ["ai-shopping"],
    })) as ApiResponse<IAiShoppingList>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to generate AI shopping list.",
      data: null as unknown as IAiShoppingList,
    };
  }
};

export const updateAiShoppingListStatus = async (
  messId: string,
  listId: string,
  status: Extract<AiShoppingStatus, "approved" | "rejected">
): Promise<ApiResponse<IAiShoppingList>> => {
  try {
    return (await serverFetch(`/messes/${messId}/ai-shopping/${listId}/status`, {
      method: "PATCH",
      body: { status },
      updateTag: ["ai-shopping"],
    })) as ApiResponse<IAiShoppingList>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update AI shopping list status.",
      data: null as unknown as IAiShoppingList,
    };
  }
};

export const convertAiShoppingListToSchedule = async (
  messId: string,
  listId: string,
  data: ConvertAiShoppingListPayload
): Promise<ApiResponse<IMarketSchedule>> => {
  try {
    return (await serverFetch(`/messes/${messId}/ai-shopping/${listId}/convert`, {
      method: "POST",
      body: data,
      updateTag: ["ai-shopping", "market-schedules", "dashboard-stats"],
    })) as ApiResponse<IMarketSchedule>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to convert list to market schedule.",
      data: null as unknown as IMarketSchedule,
    };
  }
};

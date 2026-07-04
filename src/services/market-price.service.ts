"use server";

import { serverFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/global.type";
import { IMarketPrice, IMarketPriceFormData } from "@/types/market-price.type";

export const getMarketPrices = async (
  messId: string
): Promise<ApiResponse<IMarketPrice[]>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-prices`, {
      method: "GET",
      tags: ["market-prices"],
    })) as ApiResponse<IMarketPrice[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch market prices.",
      data: [],
    };
  }
};

export const upsertMarketPrice = async (
  messId: string,
  data: IMarketPriceFormData
): Promise<ApiResponse<IMarketPrice>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-prices`, {
      method: "POST",
      body: data,
      tags: ["market-prices"],
    })) as ApiResponse<IMarketPrice>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to save market price.",
      data: null as unknown as IMarketPrice,
    };
  }
};

export const bulkUpsertMarketPrices = async (
  messId: string,
  items: IMarketPriceFormData[]
): Promise<ApiResponse<IMarketPrice[]>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-prices/bulk`, {
      method: "POST",
      body: { items },
      tags: ["market-prices"],
    })) as ApiResponse<IMarketPrice[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update market prices.",
      data: [],
    };
  }
};

export const resetMarketPrices = async (
  messId: string
): Promise<ApiResponse<IMarketPrice[]>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-prices/reset`, {
      method: "POST",
      tags: ["market-prices"],
    })) as ApiResponse<IMarketPrice[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to reset market prices.",
      data: [],
    };
  }
};

export const deleteMarketPrice = async (
  messId: string,
  itemName: string
): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch(`/messes/${messId}/market-prices/${encodeURIComponent(itemName)}`, {
      method: "DELETE",
      tags: ["market-prices"],
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to delete market price.",
      data: null,
    };
  }
};

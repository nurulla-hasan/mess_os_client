"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { INotice, INoticeUpdatePayload } from "@/types/notice.type";

/**
 * Get notices for a specific mess with optional filters/pagination
 */
export const getNotices = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<INotice[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/notices${qs}`, {
      method: "GET",
      tags: ["notices"],
    })) as ApiResponse<INotice[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch notices.",
      data: [],
    };
  }
};

/**
 * Create a new notice
 */
export const createNotice = async (
  messId: string,
  data: Record<string, unknown>
): Promise<ApiResponse<INotice>> => {
  try {
    return (await serverFetch(`/messes/${messId}/notices`, {
      method: "POST",
      body: data,
      updateTag: ["notices"],
    })) as ApiResponse<INotice>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create notice.",
      data: null as unknown as INotice,
    };
  }
};

/**
 * Archive notice
 */
export const archiveNotice = async (
  messId: string,
  noticeId: string
): Promise<ApiResponse<INotice>> => {
  try {
    return (await serverFetch(`/messes/${messId}/notices/${noticeId}/archive`, {
      method: "POST",
      updateTag: ["notices"],
    })) as ApiResponse<INotice>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to archive notice.",
      data: null as unknown as INotice,
    };
  }
};

/**
 * Pin / Unpin notice
 */
export const toggleNoticePin = async (
  messId: string,
  noticeId: string,
  isPinned: boolean
): Promise<ApiResponse<INotice>> => {
  try {
    return (await serverFetch(`/messes/${messId}/notices/${noticeId}/pin`, {
      method: "PATCH",
      body: { isPinned },
      updateTag: ["notices"],
    })) as ApiResponse<INotice>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update notice pin status.",
      data: null as unknown as INotice,
    };
  }
};
/**
 * Update notice (Generic)
 */
export const updateNotice = async (
  messId: string,
  noticeId: string,
  data: INoticeUpdatePayload
): Promise<ApiResponse<INotice>> => {
  try {
    return (await serverFetch(`/messes/${messId}/notices/${noticeId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["notices"],
    })) as ApiResponse<INotice>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update notice.",
      data: null as unknown as INotice,
    };
  }
};

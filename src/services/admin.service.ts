/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";

/**
 * List all manager access requests (Super Admin)
 */
export const getAllManagerRequests = async (params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/admin/manager-requests${qs}`, {
      method: "GET",
      tags: ["manager-requests"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch manager requests.",
    };
  }
};

/**
 * Review/Update manager request status (Super Admin)
 */
export const updateManagerRequestStatus = async (
  requestId: string, 
  data: { status: "approved" | "rejected"; adminNote?: string }
): Promise<any> => {
  try {
    return await serverFetch(`/admin/manager-requests/${requestId}/status`, {
      method: "PATCH",
      body: data,
      updateTag: ["manager-requests", "my-manager-request", "user-profile"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update request status.",
    };
  }
};

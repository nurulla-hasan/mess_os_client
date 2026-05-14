"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IComplaint, ComplaintStatus } from "@/types/complaint.type";

/**
 * Get complaints for a specific mess
 */
export const getComplaints = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IComplaint[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/complaints${qs}`, {
      method: "GET",
      tags: ["complaints"],
    })) as ApiResponse<IComplaint[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch complaints.",
      data: [],
    };
  }
};

/**
 * Create a new complaint
 */
export const createComplaint = async (
  messId: string,
  data: { title: string; description: string }
): Promise<ApiResponse<IComplaint>> => {
  try {
    return (await serverFetch(`/messes/${messId}/complaints`, {
      method: "POST",
      body: data,
      updateTag: ["complaints"],
    })) as ApiResponse<IComplaint>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create complaint.",
      data: null as unknown as IComplaint,
    };
  }
};

/**
 * Update complaint status
 */
export const updateComplaintStatus = async (
  messId: string,
  complaintId: string,
  status: ComplaintStatus,
  resolvedNote?: string
): Promise<ApiResponse<IComplaint>> => {
  try {
    return (await serverFetch(`/messes/${messId}/complaints/${complaintId}/status`, {
      method: "PATCH",
      body: { status, resolvedNote },
      updateTag: ["complaints"],
    })) as ApiResponse<IComplaint>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update status.",
      data: null as unknown as IComplaint,
    };
  }
};

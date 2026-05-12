/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";

export const createMess = async (data: any): Promise<any> => {
  try {
    const response = await serverFetch("/messes", {
      method: "POST",
      body: data,
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
      data: null,
    };
  }
};

export const joinMess = async (data: any): Promise<any> => {
  try {
    const response = await serverFetch("/messes/join", {
      method: "POST",
      body: data,
    });
    return response;
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
      data: null,
    };
  }
};

/**
 * Get members of a specific mess with optional status filtering
 */
export const getMessMembers = async (messId: string, params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/messes/${messId}/members${qs}`, {
      method: "GET",
      tags: ["mess-members"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch mess members.",
    };
  }
};

/**
 * Update member status (approve/reject)
 */
export const updateMemberStatus = async (messId: string, memberId: string, status: "active" | "rejected"): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/members/${memberId}/status`, {
      method: "PATCH",
      body: { status },
      updateTag: ["mess-members"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update member status.",
    };
  }
};

/**
 * Remove a member from the mess
 */
export const removeMember = async (messId: string, memberId: string): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/members/${memberId}/remove`, {
      method: "POST",
      updateTag: ["mess-members"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to remove member.",
    };
  }
};

/**
 * Get details of a specific mess
 */
export const getMessDetails = async (messId: string): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}`, {
      method: "GET",
      tags: ["mess-details"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch mess details.",
    };
  }
};

/**
 * Get active member options for dropdowns/selects (no pagination).
 * Endpoint: GET /messes/:messId/members/options
 */
export const getMessMemberOptions = async (messId: string): Promise<any> => {
  try {
    return await serverFetch(`/messes/${messId}/members/options`, {
      method: "GET",
      tags: ["member-options"],
    });
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch member options.",
      data: [],
    };
  }
};

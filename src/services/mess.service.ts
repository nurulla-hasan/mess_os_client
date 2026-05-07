/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";

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

import { buildQueryString } from "@/lib/buildQueryString";

/**
 * Get members of a specific mess with optional status filtering
 */
export const getMessMembers = async (messId: string, params: Record<string, any> = {}): Promise<any> => {
  const qs = buildQueryString(params);
  const url = `/messes/${messId}/members${qs}`;
  return await serverFetch(url);
};

/**
 * Approve a pending member request
 */
export const approveMember = async (messId: string, memberId: string): Promise<any> => {
  return await serverFetch(`/messes/${messId}/members/${memberId}/approve`, {
    method: "POST",
  });
};

/**
 * Reject a pending member request
 */
export const rejectMember = async (messId: string, memberId: string): Promise<any> => {
  return await serverFetch(`/messes/${messId}/members/${memberId}/reject`, {
    method: "POST",
  });
};

/**
 * Remove a member from the mess
 */
export const removeMember = async (messId: string, memberId: string): Promise<any> => {
  return await serverFetch(`/messes/${messId}/members/${memberId}/remove`, {
    method: "POST",
  });
};

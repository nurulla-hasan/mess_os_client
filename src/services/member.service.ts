/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";

/**
 * Get real-time dashboard stats for the authenticated user
 */

export const getMemberList = async (params: QueryParams = {}): Promise<any> => {
  return await serverFetch(`/members${buildQueryString(params)}`, {
    tags: ["member-list"],
    revalidate: 3600,
  });
};

export const getMemberDetail = async (memberId: string): Promise<any> => {
  return await serverFetch(`/members/${memberId}`, {
  });
};

export const createMember = async (memberData: any): Promise<any> => {
  return await serverFetch(`/members`, {
    method: "POST",
    body: memberData,
    updateTag: "member-list",
  });
};

export const updateMemberStatus = async (memberId: string, status: string): Promise<any> => {
  return await serverFetch(`/members/${memberId}/status`, {
    method: "PATCH",
    body: { status },
    updateTag: "member-list",
  });
};

export const deleteMember = async (memberId: string): Promise<any> => {
  return await serverFetch(`/members/${memberId}`, {
    method: "DELETE",
    updateTag: "member-list",
  });
};
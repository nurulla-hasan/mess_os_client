"use server";

import { serverFetch } from "@/lib/fetcher";
import { FieldValues } from "react-hook-form";
import { ApiResponse } from "@/types/global.type";

import { IManagerRequest } from "@/types/manager-request.type";

/**
 * Request manager access role
 */
export const requestManagerAccess = async (
  data: FieldValues
): Promise<ApiResponse<IManagerRequest>> => {
  try {
    return (await serverFetch("/users/me/manager-request", {
      method: "POST",
      body: data,
      updateTag: "my-manager-request",
    })) as ApiResponse<IManagerRequest>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to submit request. Please try again.",
      data: null as unknown as IManagerRequest,
    };
  }
};

/**
 * Get current user's manager access request
 */
export const getMyManagerRequest = async (): Promise<ApiResponse<IManagerRequest | null>> => {
  try {
    return (await serverFetch("/users/me/manager-request", {
      method: "GET",
      tags: ["my-manager-request"],
    })) as ApiResponse<IManagerRequest | null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch request status.",
      data: null,
    };
  }
};

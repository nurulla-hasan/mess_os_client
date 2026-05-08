/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { FieldValues } from "react-hook-form";

/**
 * Request manager access role
 */
export const requestManagerAccess = async (data: FieldValues): Promise<any> => {
  try {
    return await serverFetch("/users/me/manager-request", {
      method: "POST",
      body: data,
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to submit request. Please try again.",
      error: error?.data,
    };
  }
};

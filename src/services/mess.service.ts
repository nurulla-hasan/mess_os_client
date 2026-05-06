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

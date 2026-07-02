"use server";

import { cookies } from "next/headers";
import { serverFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/global.type";

/** Read accessToken cookie and return Authorization header if logged in */
async function getAuthHeaders(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface ChatResponse {
  answer: string;
  sessionId: string;
}

export interface HistoryMessage {
  _id?: string;
  sessionId?: string;
  question?: string;
  answer?: string;
  role?: "user" | "assistant";
  content?: string;
  context?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const chatWithAI = async (
  question: string,
  context?: string,
  sessionId?: string
): Promise<ApiResponse<ChatResponse>> => {
  try {
    const authHeaders = await getAuthHeaders();
    return (await serverFetch("/docs/chat", {
      method: "POST",
      body: { question, context, sessionId },
      headers: authHeaders,
      isPublic: true,
    })) as ApiResponse<ChatResponse>;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get AI response",
      data: undefined as unknown as ChatResponse,
    };
  }
};

export const getChatHistory = async (
  sessionId: string
): Promise<ApiResponse<HistoryMessage[]>> => {
  try {
    const authHeaders = await getAuthHeaders();
    return (await serverFetch(`/docs/chat?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "GET",
      headers: authHeaders,
      isPublic: true,
      revalidate: 0,
    })) as ApiResponse<HistoryMessage[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to fetch history",
      data: undefined as unknown as HistoryMessage[],
    };
  }
};

export const deleteChatHistory = async (
  sessionId: string
): Promise<ApiResponse<null>> => {
  try {
    const authHeaders = await getAuthHeaders();
    return (await serverFetch(`/docs/chat?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "DELETE",
      headers: authHeaders,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete history",
      data: undefined as unknown as null,
    };
  }
};

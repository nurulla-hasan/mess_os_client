"use server";

import { serverFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/global.type";

export interface ChatResponse {
  answer: string;
  sessionId: string;
}

export interface HistoryMessage {
  _id: string;
  sessionId: string;
  question: string;
  answer: string;
  context?: string;
  createdAt: string;
  updatedAt: string;
}

export const chatWithAI = async (
  question: string,
  context?: string,
  sessionId?: string
): Promise<ApiResponse<ChatResponse>> => {
  try {
    return (await serverFetch("/docs/chat", {
      method: "POST",
      body: { question, context, sessionId },
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
    return (await serverFetch(`/docs/chat?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "GET",
      isPublic: true,
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
    return (await serverFetch(`/docs/chat?sessionId=${encodeURIComponent(sessionId)}`, {
      method: "DELETE",
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

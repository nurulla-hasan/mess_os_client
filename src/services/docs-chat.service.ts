"use server";

import { serverFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/global.type";

export interface ChatResponse {
  answer: string;
}

export const chatWithAI = async (
  question: string,
  context?: string
): Promise<ApiResponse<ChatResponse>> => {
  try {
    return (await serverFetch("/docs/chat", {
      method: "POST",
      body: { question, context },
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

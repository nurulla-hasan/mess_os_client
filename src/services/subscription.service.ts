"use server";

import { serverFetch } from "@/lib/fetcher";
import { ApiResponse } from "@/types/global.type";
import {
  ISubscriptionPlan,
  IMessSubscription,
  ISubscriptionLog,
} from "@/types/subscription.type";

/**
 * Get all available subscription plans
 * Endpoint: GET /subscriptions/plans
 */
export const getSubscriptionPlans = async (): Promise<
  ApiResponse<ISubscriptionPlan[]>
> => {
  try {
    return (await serverFetch("/subscriptions/plans", {
      method: "GET",
      isPublic: true,
      tags: ["subscriptions", "plans"],
    })) as ApiResponse<ISubscriptionPlan[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as Error)?.message || "Failed to fetch subscription plans.",
      data: [],
    };
  }
};

/**
 * Get current subscription details for a mess
 * Endpoint: GET /messes/:messId/subscriptions/current
 */
export const getCurrentSubscription = async (
  messId: string,
): Promise<ApiResponse<IMessSubscription>> => {
  try {
    return (await serverFetch(`/messes/${messId}/subscriptions/current`, {
      method: "GET",
      tags: ["subscriptions", "current"],
      revalidate: 0,
    })) as ApiResponse<IMessSubscription>;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as Error)?.message || "Failed to fetch current subscription.",
      data: null as unknown as IMessSubscription,
    };
  }
};

/**
 * Get subscription history (logs) for a mess
 * Endpoint: GET /messes/:messId/subscriptions/history
 */
export const getSubscriptionHistory = async (
  messId: string,
): Promise<ApiResponse<ISubscriptionLog[]>> => {
  try {
    return (await serverFetch(`/messes/${messId}/subscriptions/history`, {
      method: "GET",
      tags: ["subscriptions", "history"],
      revalidate: 0,
    })) as ApiResponse<ISubscriptionLog[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as Error)?.message || "Failed to fetch subscription history.",
      data: [],
    };
  }
};

/**
 * Subscribe to a plan
 * Endpoint: POST /messes/:messId/subscriptions/subscribe
 */
export const subscribeToPlan = async (
  messId: string,
  planId: string,
): Promise<
  ApiResponse<{
    paymentRequired: boolean;
    gatewayUrl?: string;
    tranId?: string;
    plan: ISubscriptionPlan;
  }>
> => {
  try {
    return (await serverFetch(`/messes/${messId}/subscriptions/subscribe`, {
      method: "POST",
      body: { planId },
      updateTag: ["subscriptions", "current", "history"],
    })) as ApiResponse<{
      paymentRequired: boolean;
      gatewayUrl?: string;
      tranId?: string;
      plan: ISubscriptionPlan;
    }>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to initiate subscription.",
      data: null as unknown as {
        paymentRequired: boolean;
        gatewayUrl?: string;
        tranId?: string;
        plan: ISubscriptionPlan;
      },
    };
  }
};

/**
 * Cancel current subscription
 * Endpoint: POST /messes/:messId/subscriptions/cancel
 */
export const cancelSubscription = async (
  messId: string,
): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch(`/messes/${messId}/subscriptions/cancel`, {
      method: "POST",
      updateTag: ["subscriptions", "current", "history"],
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to cancel subscription.",
      data: null,
    };
  }
};

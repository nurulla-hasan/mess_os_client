/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams } from "@/types/global.type";
import { MessStatus } from "@/types/mess.type";

/**
 * List all manager access requests (Super Admin)
 */
export const getAllManagerRequests = async (params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/admin/manager-requests${qs}`, {
      method: "GET",
      tags: ["manager-requests"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch manager requests.",
    };
  }
};

/**
 * Review/Update manager request status (Super Admin)
 */
export const updateManagerRequestStatus = async (
  requestId: string, 
  data: { status: "approved" | "rejected"; adminNote?: string }
): Promise<any> => {
  try {
    return await serverFetch(`/admin/manager-requests/${requestId}/status`, {
      method: "PATCH",
      body: data,
      updateTag: ["manager-requests", "my-manager-request", "user-profile"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update request status.",
    };
  }
};
/**
 * List all messes on the platform (Super Admin)
 */
export const getAllMesses = async (params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/admin/messes${qs}`, {
      method: "GET",
      tags: ["messes"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch messes.",
    };
  }
};


/**
 * Suspend/Unsuspend a mess (Super Admin)
 */
export const suspendMess = async (
  messId: string, 
  data: { status: MessStatus; suspensionNote?: string }
): Promise<any> => {
  try {
    return await serverFetch(`/admin/messes/${messId}/suspend`, {
      method: "PATCH",
      body: data,
      updateTag: ["messes"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update mess status.",
    };
  }
};
/**
 * List all users on the platform (Super Admin)
 */
export const getAllUsers = async (params: QueryParams = {}): Promise<any> => {
  const qs = buildQueryString(params);
  try {
    return await serverFetch(`/admin/users${qs}`, {
      method: "GET",
      tags: ["users"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch users.",
    };
  }
};

/**
 * Update user status (Super Admin)
 */
export const updateUserStatus = async (
  userId: string,
  status: "active" | "blocked"
): Promise<any> => {
  try {
    return await serverFetch(`/admin/users/${userId}/status`, {
      method: "PATCH",
      body: { status },
      tags: ["users"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update user status.",
    };
  }
};

/**
 * Update user global role (Super Admin)
 */
export const updateUserRole = async (
  userId: string,
  globalRole: "user" | "manager" | "super_admin"
): Promise<any> => {
  try {
    return await serverFetch(`/admin/users/${userId}/role`, {
      method: "PATCH",
      body: { globalRole },
      tags: ["users"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update user role.",
    };
  }
};

/**
 * Get platform-wide statistics (Super Admin)
 */
export const getPlatformStats = async (): Promise<any> => {
  try {
    return await serverFetch("/admin/stats", {
      method: "GET",
      cache: "no-store",
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch platform stats.",
    };
  }
};

/**
 * Get platform-wide analytics (Super Admin)
 */
export const getPlatformAnalytics = async (): Promise<any> => {
  try {
    return await serverFetch("/admin/analytics", {
      method: "GET",
      cache: "no-store",
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch platform analytics.",
    };
  }
};

/**
 * Get all subscription plans (Super Admin)
 */
export const getSubscriptionPlans = async (): Promise<any> => {
  try {
    return await serverFetch("/admin/subscription-plans", {
      method: "GET",
      tags: ["subscription-plans"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch subscription plans.",
    };
  }
};

/**
 * Get all platform subscriptions history (Super Admin)
 */
export const getAllSubscriptions = async (params: Record<string, any> = {}): Promise<any> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) queryParams.append(key, value.toString());
  });

  try {
    return await serverFetch(`/admin/subscriptions?${queryParams.toString()}`, {
      method: "GET",
      tags: ["all-subscriptions"],
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to fetch platform subscriptions.",
    };
  }
};

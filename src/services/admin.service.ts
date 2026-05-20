"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { MessStatus, IMess } from "@/types/mess.type";
import { IUser } from "@/types/user.type";
import { IManagerRequest } from "@/types/manager-request.type";
import { IPlatformAnalytics } from "@/types/analytics.type";
import { ISubscriptionPlan, ISubscriptionHistory } from "@/types/subscription.type";

export interface IPlatformStats {
  totalUsers: number;
  totalMesses: number;
  activeMesses: number;
  suspendedMesses: number;
  [key: string]: unknown;
}

interface UpdateManagerRequestStatusPayload {
  status: "approved" | "rejected";
  adminNote?: string;
}

interface SuspendMessPayload {
  status: MessStatus;
  suspensionNote?: string;
}

interface UpdateUserStatusPayload {
  status: "active" | "blocked";
}

interface UpdateUserRolePayload {
  globalRole: "user" | "manager" | "super_admin";
}

/**
 * List all manager access requests (Super Admin)
 */
export const getAllManagerRequests = async (
  params: QueryParams = {}
): Promise<ApiResponse<IManagerRequest[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/admin/manager-requests${qs}`, {
      method: "GET",
      tags: ["manager-requests"],
    })) as ApiResponse<IManagerRequest[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch manager requests.",
      data: [],
    };
  }
};

/**
 * Review/Update manager request status (Super Admin)
 */
export const updateManagerRequestStatus = async (
  requestId: string,
  data: UpdateManagerRequestStatusPayload
): Promise<ApiResponse<IManagerRequest>> => {
  try {
    return (await serverFetch(`/admin/manager-requests/${requestId}/status`, {
      method: "PATCH",
      body: data,
      updateTag: ["manager-requests", "my-manager-request", "user-profile"],
    })) as ApiResponse<IManagerRequest>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update request status.",
      data: null as unknown as IManagerRequest,
    };
  }
};

/**
 * List all messes on the platform (Super Admin)
 */
export const getAllMesses = async (params: QueryParams = {}): Promise<ApiResponse<IMess[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/admin/messes${qs}`, {
      method: "GET",
      tags: ["messes"],
    })) as ApiResponse<IMess[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch messes.",
      data: [],
    };
  }
};

/**
 * Suspend/Unsuspend a mess (Super Admin)
 */
export const suspendMess = async (
  messId: string,
  data: SuspendMessPayload
): Promise<ApiResponse<IMess>> => {
  try {
    return (await serverFetch(`/admin/messes/${messId}/suspend`, {
      method: "PATCH",
      body: data,
      updateTag: ["messes"],
    })) as ApiResponse<IMess>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update mess status.",
      data: null as unknown as IMess,
    };
  }
};

/**
 * Permanently delete a mess and all related records (Super Admin)
 */
export const deleteMessPermanently = async (
  messId: string
): Promise<ApiResponse<{ messDeleted: number; downgradedManagers: number; deleted: Record<string, number> }>> => {
  try {
    return (await serverFetch(`/admin/messes/${messId}`, {
      method: "DELETE",
      updateTag: ["messes", "all-subscriptions", "dashboard-stats"],
    })) as ApiResponse<{ messDeleted: number; downgradedManagers: number; deleted: Record<string, number> }>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to delete mess.",
      data: { messDeleted: 0, downgradedManagers: 0, deleted: {} },
    };
  }
};

/**
 * List all users on the platform (Super Admin)
 */
export const getAllUsers = async (params: QueryParams = {}): Promise<ApiResponse<IUser[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/admin/users${qs}`, {
      method: "GET",
      tags: ["users"],
    })) as ApiResponse<IUser[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch users.",
      data: [],
    };
  }
};

/**
 * Update user status (Super Admin)
 */
export const updateUserStatus = async (
  userId: string,
  status: "active" | "blocked"
): Promise<ApiResponse<IUser>> => {
  try {
    const payload: UpdateUserStatusPayload = { status };
    return (await serverFetch(`/admin/users/${userId}/status`, {
      method: "PATCH",
      body: payload,
      updateTag: ["users", "user-profile"],
    })) as ApiResponse<IUser>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update user status.",
      data: null as unknown as IUser,
    };
  }
};

/**
 * Update user global role (Super Admin)
 */
export const updateUserRole = async (
  userId: string,
  globalRole: "user" | "manager" | "super_admin"
): Promise<ApiResponse<IUser>> => {
  try {
    const payload: UpdateUserRolePayload = { globalRole };
    return (await serverFetch(`/admin/users/${userId}/role`, {
      method: "PATCH",
      body: payload,
      updateTag: ["users", "user-profile"],
    })) as ApiResponse<IUser>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update user role.",
      data: null as unknown as IUser,
    };
  }
};

/**
 * Get platform-wide statistics (Super Admin)
 */
export const getPlatformStats = async (): Promise<ApiResponse<IPlatformStats>> => {
  try {
    return (await serverFetch("/admin/stats", {
      method: "GET",
      revalidate: 0,
    })) as ApiResponse<IPlatformStats>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch platform stats.",
      data: {} as IPlatformStats,
    };
  }
};

/**
 * Get platform-wide analytics (Super Admin)
 */
export const getPlatformAnalytics = async (): Promise<ApiResponse<IPlatformAnalytics>> => {
  try {
    return (await serverFetch("/admin/analytics", {
      method: "GET",
      revalidate: 0,
    })) as ApiResponse<IPlatformAnalytics>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch platform analytics.",
      data: null as unknown as IPlatformAnalytics,
    };
  }
};

/**
 * Get all subscription plans (Super Admin)
 */
export const getSubscriptionPlans = async (): Promise<ApiResponse<ISubscriptionPlan[]>> => {
  try {
    return (await serverFetch("/admin/subscription-plans", {
      method: "GET",
      tags: ["subscription-plans"],
    })) as ApiResponse<ISubscriptionPlan[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch subscription plans.",
      data: [],
    };
  }
};

/**
 * Get all platform subscriptions history (Super Admin)
 */
export const getAllSubscriptions = async (
  params: Record<string, unknown> = {}
): Promise<ApiResponse<ISubscriptionHistory[]>> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) queryParams.append(key, String(value));
  });

  try {
    return (await serverFetch(`/admin/subscriptions?${queryParams.toString()}`, {
      method: "GET",
      tags: ["all-subscriptions"],
    })) as ApiResponse<ISubscriptionHistory[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch platform subscriptions.",
      data: [],
    };
  }
};

/**
 * Create a new subscription plan (Super Admin)
 */
export const createSubscriptionPlan = async (
  data: Record<string, unknown>
): Promise<ApiResponse<ISubscriptionPlan>> => {
  try {
    return (await serverFetch("/admin/subscription-plans", {
      method: "POST",
      body: data,
      updateTag: ["subscription-plans", "all-subscriptions"],
    })) as ApiResponse<ISubscriptionPlan>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create subscription plan.",
      data: null as unknown as ISubscriptionPlan,
    };
  }
};

/**
 * Update a subscription plan (Super Admin)
 */
export const updateSubscriptionPlan = async (
  id: string,
  data: Record<string, unknown>
): Promise<ApiResponse<ISubscriptionPlan>> => {
  try {
    return (await serverFetch(`/admin/subscription-plans/${id}`, {
      method: "PATCH",
      body: data,
      updateTag: ["subscription-plans", "all-subscriptions"],
    })) as ApiResponse<ISubscriptionPlan>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update subscription plan.",
      data: null as unknown as ISubscriptionPlan,
    };
  }
};

/**
 * Delete a subscription plan (Super Admin)
 */
export const deleteSubscriptionPlan = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch(`/admin/subscription-plans/${id}`, {
      method: "DELETE",
      updateTag: ["subscription-plans", "all-subscriptions"],
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to delete subscription plan.",
      data: null,
    };
  }
};

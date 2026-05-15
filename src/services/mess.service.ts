"use server";

import { cookies } from "next/headers";
import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { QueryParams, ApiResponse } from "@/types/global.type";
import { IMember, IMemberOption } from "@/types/member.type";
import { IMess } from "@/types/mess.type";
import { IManagerDashboardData, IMemberDashboardData } from "@/types/dashboard.type";

// ─── Service Functions ────────────────────────────────────────────────────────

export const getMemberDashboard = async (
  messId: string,
): Promise<ApiResponse<IMemberDashboardData>> => {
  try {
    return (await serverFetch(`/messes/${messId}/member-dashboard`, {
      method: "GET",
      tags: [
        "dashboard-stats",
        "mess-details",
        "meals",
        "market-schedules",
        "meal-off-requests",
        "mess-members",
        "notices",
        "payments",
      ],
    })) as ApiResponse<IMemberDashboardData>;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as Error)?.message || "Failed to fetch member dashboard data.",
      data: null as unknown as IMemberDashboardData,
    };
  }
};

export const createMess = async (
  data: Record<string, unknown>,
): Promise<ApiResponse<IMess>> => {
  try {
    const res = (await serverFetch("/messes", {
      method: "POST",
      body: data,
    })) as ApiResponse<IMess>;
    if (res?.success && res.data?._id) {
      const cookieStore = await cookies();
      cookieStore.set("activeMessId", res.data._id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return res;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
      data: null as unknown as IMess,
    };
  }
};

export const joinMess = async (
  data: Record<string, unknown>,
): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/messes/join", {
      method: "POST",
      body: data,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
      data: null,
    };
  }
};

/**
 * Get members of a specific mess with optional status/pagination filtering
 */
export const getMessMembers = async (
  messId: string,
  params: QueryParams = {},
): Promise<ApiResponse<IMember[]>> => {
  const qs = buildQueryString(params);
  try {
    return (await serverFetch(`/messes/${messId}/members${qs}`, {
      method: "GET",
      tags: ["mess-members"],
    })) as ApiResponse<IMember[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch mess members.",
      data: [],
    };
  }
};

/**
 * Update member status (approve / reject)
 */
export const updateMemberStatus = async (
  messId: string,
  memberId: string,
  status: "active" | "rejected",
): Promise<ApiResponse<IMember>> => {
  try {
    return (await serverFetch(`/messes/${messId}/members/${memberId}/status`, {
      method: "PATCH",
      body: { status },
      updateTag: ["mess-members", "member-options"],
    })) as ApiResponse<IMember>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update member status.",
      data: null as unknown as IMember,
    };
  }
};

/**
 * Remove a member from the mess
 */
export const removeMember = async (
  messId: string,
  memberId: string,
): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch(`/messes/${messId}/members/${memberId}/remove`, {
      method: "POST",
      updateTag: ["mess-members", "member-options"],
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to remove member.",
      data: null,
    };
  }
};

/**
 * Get details of a specific mess
 */
export const getMessDetails = async (
  messId: string,
): Promise<ApiResponse<IMess>> => {
  try {
    return (await serverFetch(`/messes/${messId}`, {
      method: "GET",
      tags: ["mess-details"],
    })) as ApiResponse<IMess>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch mess details.",
      data: null as unknown as IMess,
    };
  }
};

/**
 * Get active member options for dropdowns/selects (no pagination).
 * Endpoint: GET /messes/:messId/members/options
 */
export const getMessMemberOptions = async (
  messId: string,
): Promise<ApiResponse<IMemberOption[]>> => {
  try {
    return (await serverFetch(`/messes/${messId}/members/options`, {
      method: "GET",
      tags: ["member-options"],
    })) as ApiResponse<IMemberOption[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch member options.",
      data: [],
    };
  }
};

/**
 * Get aggregated dashboard data for the manager
 */
export const getManagerDashboard = async (
  messId: string,
): Promise<ApiResponse<IManagerDashboardData>> => {
  try {
    return (await serverFetch(`/messes/${messId}/dashboard`, {
      method: "GET",
      tags: [
        "dashboard-stats",
        "mess-details",
        "meals",
        "market-schedules",
        "meal-off-requests",
        "mess-members",
      ],
    })) as ApiResponse<IManagerDashboardData>;
  } catch (error: unknown) {
    return {
      success: false,
      message:
        (error as Error)?.message || "Failed to fetch manager dashboard data.",
      data: null as unknown as IManagerDashboardData,
    };
  }
};

/**
 * Update mess details (Manager only)
 */
export const updateMess = async (
  messId: string,
  data: {
    name?: string;
    address?: string;
    settings?: {
      mealCategories?: string[];
      equalShareCategories?: string[];
    };
  },
): Promise<ApiResponse<IMess>> => {
  try {
    return (await serverFetch(`/messes/${messId}`, {
      method: "PATCH",
      body: data,
      updateTag: ["mess-details", "dashboard-stats"],
    })) as ApiResponse<IMess>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update mess.",
      data: null as unknown as IMess,
    };
  }
};

/**
 * Regenerate mess invite code (Manager only)
 */
export const regenerateInviteCode = async (
  messId: string,
): Promise<ApiResponse<IMess>> => {
  try {
    return (await serverFetch(`/messes/${messId}/regenerate-invite-code`, {
      method: "POST",
      updateTag: ["mess-details", "dashboard-stats"],
    })) as ApiResponse<IMess>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to regenerate invite code.",
      data: null as unknown as IMess,
    };
  }
};

/**
 * Transfer mess ownership to another member (Manager only)
 */
export const transferOwnership = async (
  messId: string,
  newManagerUserId: string,
): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch(`/messes/${messId}/transfer-ownership`, {
      method: "POST",
      body: { newManagerUserId },
      updateTag: ["mess-details", "mess-members", "dashboard-stats"],
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to transfer ownership.",
      data: null,
    };
  }
};

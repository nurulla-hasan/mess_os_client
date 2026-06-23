"use server";

import { serverFetch } from "@/lib/fetcher";
import { isSecureCookie } from "@/lib/utils";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/global.type";
import { IUser, IMembership } from "@/types/user.type";
import { IMess } from "@/types/mess.type";
import { getUsableMemberships } from "@/lib/auth-routing";

interface AuthResponseData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

/**
 * Register a new user
 */
export const register = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/register", {
      method: "POST",
      body: data,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Registration failed. Please try again.",
      data: null,
    };
  }
};

/**
 * Verify email OTP after registration
 */
export const verifyOtp = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/verify-email", {
      method: "POST",
      body: data,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Verification failed. Please try again.",
      data: null,
    };
  }
};

/**
 * Resend email verification OTP
 */
export const resendVerifyOtp = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/resend-otp", {
      method: "POST",
      body: data,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to resend OTP. Please try again.",
      data: null,
    };
  }
};

/**
 * Login user (Backend handles cookies automatically)
 */
export const login = async (data: FieldValues): Promise<ApiResponse<AuthResponseData>> => {
  try {
    const rememberMe = data?.rememberMe === true;
    const response = (await serverFetch("/auth/login", {
      method: "POST",
      body: data,
      isPublic: true,
      setCookies: [
        { responsePath: "data.accessToken", cookieName: "accessToken" },
      ],
    })) as ApiResponse<AuthResponseData>;

    if (response && response.success) {
      const cookieStore = await cookies();
      const responseData = response.data;

      // Store rememberMe preference as a cookie (for refresh token rotation to read)
      cookieStore.set("rememberMe", String(rememberMe), {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: "lax",
        path: "/",
        ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      });

      // Get usable memberships (membership.status active + mess.status active)
      const memberships = (responseData?.user?.memberships || []) as IMembership[];
      const usableMemberships = getUsableMemberships(memberships);

      // Only auto-set activeMessId when exactly one usable mess exists
      if (usableMemberships.length === 1) {
        const mess = usableMemberships[0].messId;
        const mId = typeof mess === "string" ? mess : (mess as IMess)?._id;
        if (mId) {
          cookieStore.set("activeMessId", mId, {
            httpOnly: true,
            secure: isSecureCookie,
            sameSite: "lax",
            path: "/",
            ...(rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
          });
        }
      }
      // 0 or 2+ usable messes: do NOT set activeMessId cookie
    }

    return response;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
      data: null as unknown as AuthResponseData,
    };
  }
};

/**
 * Get current logged-in user profile
 */
export const getMe = async (): Promise<ApiResponse<IUser>> => {
  try {
    return (await serverFetch("/users/me", {
      tags: ["user-profile"],
    })) as ApiResponse<IUser>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch profile.",
      data: null as unknown as IUser,
    };
  }
};

interface SwitchMessResponse {
  messId: string;
  messRole: "manager" | "member";
  redirectTo: string;
  mess: IMess;
  membership: IMembership;
}

/**
 * Switch active mess via backend validation, then set cookie.
 * Backend validates: user has active membership + mess is active.
 * Returns the redirect path on success, null on failure.
 */
export const switchActiveMess = async (
  messId: string
): Promise<{ success: boolean; redirectTo: string | null; message?: string }> => {
  try {
    const response = (await serverFetch("/users/me/switch-mess", {
      method: "POST",
      body: { messId },
    })) as ApiResponse<SwitchMessResponse>;

    if (response?.success && response.data) {
      const cookieStore = await cookies();
      cookieStore.set("activeMessId", response.data.messId, {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return {
        success: true,
        redirectTo: response.data.redirectTo,
      };
    }

    return {
      success: false,
      redirectTo: null,
      message: response?.message || "Failed to switch mess.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      redirectTo: null,
      message: (error as Error)?.message || "Failed to switch mess.",
    };
  }
};

/**
 * Set the active mess ID in cookies directly (Server Action)
 * Use switchActiveMess() for validated switching.
 * This is kept for internal/fallback use only.
 */
export const setActiveMessId = async (messId: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set("activeMessId", messId, {
    httpOnly: true,
    secure: isSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

/**
 * Get the active mess ID from cookies
 */
export const getActiveMessIdFromCookies = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("activeMessId")?.value || null;
};

/**
 * Update user profile (name, phone, address, bio)
 */
export const updateMe = async (data: FieldValues): Promise<ApiResponse<IUser>> => {
  try {
    return (await serverFetch("/users/me", {
      method: "PATCH",
      body: data,
      updateTag: ["dashboard-stats", "user-profile"],
    })) as ApiResponse<IUser>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update profile.",
      data: null as unknown as IUser,
    };
  }
};

/**
 * Update user avatar image
 */
export const updateAvatar = async (formData: FormData): Promise<ApiResponse<IUser>> => {
  try {
    return (await serverFetch("/users/me/avatar", {
      method: "PATCH",
      body: formData,
      updateTag: ["dashboard-stats", "user-profile"],
      // Note: serverFetch should handle FormData automatically if body is FormData
    })) as ApiResponse<IUser>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update avatar.",
      data: null as unknown as IUser,
    };
  }
};

/**
 * Initiate forgot password process
 */
export const forgotPassword = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/forgot-password", {
      method: "POST",
      body: data,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to request password reset.",
      data: null,
    };
  }
};

/**
 * Get current user role from token
 */
export const getCurrentUserRole = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const { jwtDecode } = await import("jwt-decode");
    const decoded: { globalRole?: string } = jwtDecode(token);
    return decoded.globalRole || null;
  } catch (error) {
    console.error("Error decoding token on server:", error);
    return null;
  }
};

/**
 * Reset password using OTP
 */
export const resetPassword = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/reset-password", {
      method: "POST",
      body: data,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to reset password.",
      data: null,
    };
  }
};

/**
 * Verify OTP for password reset
 */
export const verifyResetOtp = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/verify-reset-otp", {
      method: "POST",
      body: data,
      isPublic: true,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Verification failed.",
      data: null,
    };
  }
};

/**
 * Change account password
 */
export const changePassword = async (data: FieldValues): Promise<ApiResponse<null>> => {
  try {
    return (await serverFetch("/auth/change-password", {
      method: "POST",
      body: data,
    })) as ApiResponse<null>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to change password.",
      data: null,
    };
  }
};

/**
 * Logout user: invalidate refresh token on backend, then clear cookies
 */
export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    if (refreshToken) {
      await serverFetch("/auth/logout", {
        method: "POST",
        body: { refreshToken },
        // No auto-refresh needed — we are logging out
      });
    }
  } catch {
    // Silently ignore — best effort backend invalidation
  }

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("activeMessId");
  cookieStore.delete("rememberMe");
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";

/**
 * Register a new user
 */
export const register = async (data: FieldValues): Promise<any> => {
  try {
    return await serverFetch("/auth/register", {
      method: "POST",
      body: data,
      isPublic: true,
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Registration failed. Please try again.",
      error: error?.data,
    };
  }
};

/**
 * Verify email OTP after registration
 */
export const verifyOtp = async (data: FieldValues): Promise<any> => {
  try {
    return await serverFetch("/auth/verify-email", {
      method: "POST",
      body: data,
      isPublic: true,
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Verification failed. Please try again.",
      error: error?.data,
    };
  }
};

/**
 * Resend email verification OTP
 */
export const resendVerifyOtp = async (data: FieldValues): Promise<any> => {
  try {
    return await serverFetch("/auth/resend-otp", {
      method: "POST",
      body: data,
      isPublic: true,
    });
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to resend OTP. Please try again.",
      error: error?.data,
    };
  }
};

/**
 * Login user (Backend handles cookies automatically)
 */
export const login = async (data: FieldValues): Promise<any> => {
  try {
    const response = await serverFetch("/auth/login", {
      method: "POST",
      body: data,
      isPublic: true,
      persistCookies: true,
    });

    if (response && (response as any).success) {
      const cookieStore = await cookies();
      const accessToken = (response as any).data?.accessToken;

      if (accessToken) {
        cookieStore.set("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }

    return response;
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || "An unexpected error occurred.",
      data: null,
    };
  }
};

/**
 * Get current logged-in user profile
 */
export const getMe = async (): Promise<any> => {
  const response: any = await serverFetch("/users/me");
  
  // If getMe is successful and no activeMessId is set, set it from the first approved membership
  if (response && response.success && response.data) {
    try {
      const userData = response.data;
      const cookieStore = await cookies();
      const currentMessId = cookieStore.get("activeMessId")?.value;

      if (!currentMessId) {
        const memberships = userData.memberships || [];
        const approved = memberships.find((m: any) => m.status === "approved" || m.status === "active");
        
        if (approved) {
          const mId = typeof approved.messId === "string" ? approved.messId : approved.messId?._id;
          if (mId) {
            await setActiveMessId(mId);
          }
        }
      }
    } catch (cookieError) {
      console.error("Error setting activeMessId cookie:", cookieError);
    }
  }

  return response;
};

/**
 * Set the active mess ID in cookies (Server Action)
 */
export const setActiveMessId = async (messId: string) => {
  const cookieStore = await cookies();
  cookieStore.set("activeMessId", messId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
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
 * Update user profile (supports FieldValues for profile image)
 */
export const updateProfile = async (data: FieldValues): Promise<any> => {
  return await serverFetch("/auth/update-profile", {
    method: "PATCH",
    body: data,
    updateTag: "dashboard-stats",
  });
};

/**
 * Initiate forgot password process
 */
export const forgotPassword = async (data: FieldValues): Promise<any> => {
  return await serverFetch("/auth/forgot-password", {
    method: "POST",
    body: data,
    isPublic: true,
  });
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
    const decoded: any = jwtDecode(token);
    return decoded.globalRole || null;
  } catch (error) {
    console.error("Error decoding token on server:", error);
    return null;
  }
};

/**
 * Reset password using OTP
 */
export const resetPassword = async (data: FieldValues): Promise<any> => {
  return await serverFetch("/auth/reset-password", {
    method: "POST",
    body: data,
    isPublic: true,
  });
};

/**
 * Verify OTP for password reset
 */
export const verifyResetOtp = async (data: FieldValues): Promise<any> => {
  return await serverFetch("/auth/verify-reset-otp", {
    method: "POST",
    body: data,
    isPublic: true,
  });
};

/**
 * Change account password
 */
export const changePassword = async (data: FieldValues): Promise<any> => {
  return await serverFetch("/auth/change-password", {
    method: "POST",
    body: data,
  });
};

/**
 * Logout user by clearing cookies
 */
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("activeMessId");
};

"use server";

import { serverFetch } from "@/lib/fetcher";
import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/global.type";
import { IUser } from "@/types/user.type";

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
    const response = (await serverFetch("/auth/login", {
      method: "POST",
      body: data,
      isPublic: true,
      persistCookies: true,
    })) as ApiResponse<AuthResponseData>;
    console.log(response);

    if (response && response.success) {
      const cookieStore = await cookies();
      const responseData = response.data;
      const accessToken = responseData?.accessToken;

      if (accessToken) {
        cookieStore.set("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        // Get memberships from login response
        const memberships = responseData?.user?.memberships || [];
        const approved = memberships.find(
          (m: { status: string; messId: string | { _id: string } }) =>
            m.status === "approved" || m.status === "active"
        );

        if (approved) {
          const mId = typeof approved.messId === "string" ? approved.messId : approved.messId?._id;
          if (mId) {
            cookieStore.set("activeMessId", mId, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            });
          }
        }
      }
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

/**
 * Set the active mess ID in cookies (Server Action)
 */
export const setActiveMessId = async (messId: string): Promise<void> => {
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
export const updateProfile = async (data: FieldValues): Promise<ApiResponse<IUser>> => {
  try {
    return (await serverFetch("/auth/update-profile", {
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
 * Logout user by clearing cookies
 */
export const logout = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("activeMessId");
};


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import { getPostLoginRoute } from "@/lib/auth-routing";
import { IUser } from "@/types/user.type";

const authRoutesToRedirect = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const verifyOtpRoute = "/auth/verify-otp";

const protectedRoutes = [
  "/admin",
  "/manager",
  "/dashboard",
  "/pending-approval",
  "/create-mess",
  "/get-started",
];

/**
 * Use the same API base that your serverFetch uses.
 * Replace this line only if your env name is different.
 *
 * Examples:
 * - http://localhost:5000/api/v1
 * - https://api.example.com/api/v1
 */

type DecodedToken = {
  exp: number;
  globalRole?: "user" | "manager" | "super_admin";
};

async function fetchCurrentUserInProxy(
  request: NextRequest,
  accessToken: string
): Promise<IUser | null> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Cookie: request.headers.get("cookie") ?? "",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as {
      success?: boolean;
      data?: IUser;
    };

    if (!result?.success || !result?.data) {
      return null;
    }

    return result.data;
  } catch {
    return null;
  }
}

/**
 * Proxy function (Next.js 16+) to handle route protection
 * and smart auth redirects.
 */
export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    try {
      const decoded = jwtDecode<DecodedToken>(accessToken);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        const response = NextResponse.redirect(
          new URL("/auth/login", request.url)
        );
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  const isAuthRouteToRedirect = authRoutesToRedirect.some((route) =>
    pathname.startsWith(route)
  );

  const isVerifyOtpRoute = pathname.startsWith(verifyOtpRoute);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Unauthenticated users cannot access protected routes
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Smart redirect for authenticated users on auth-entry routes
  if (accessToken && (isAuthRouteToRedirect || isVerifyOtpRoute)) {
    const user = await fetchCurrentUserInProxy(request, accessToken);
    const resolvedRoute = getPostLoginRoute(user);

    // Allow unverified authenticated users to stay on verify-otp
    if (isVerifyOtpRoute && resolvedRoute === "/auth/verify-otp") {
      return NextResponse.next();
    }

    // Avoid redirect loop
    if (resolvedRoute === pathname) {
      return NextResponse.next();
    }

    // If user data fetch fails, getPostLoginRoute(null) => /get-started
    return NextResponse.redirect(new URL(resolvedRoute, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

import { getPostLoginRoute, getUsableMemberships } from "@/lib/auth-routing";
import { IMembership, IUser } from "@/types/user.type";
import { IMess } from "@/types/mess.type";

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
  "/join-mess",
  "/blocked",
  "/select-mess",
];

type DecodedToken = {
  exp: number;
  globalRole?: "user" | "manager" | "super_admin";
};

async function fetchCurrentUserInProxy(
  request: NextRequest,
  accessToken: string
): Promise<IUser | null> {
  if (!process.env.NEXT_PUBLIC_BASE_API) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
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
  const activeMessId = request.cookies.get("activeMessId")?.value;

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
        response.cookies.delete("activeMessId");
        return response;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("activeMessId");
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

  // Strict Role-Based Route Protection
  if (accessToken && (isAuthRouteToRedirect || isVerifyOtpRoute || isProtectedRoute)) {
    const user = await fetchCurrentUserInProxy(request, accessToken);
    let resolvedRoute = getPostLoginRoute(user, activeMessId);

    // Fallback: If backend fetch fails but token is valid, use token's globalRole
    if (!user) {
      try {
        const decoded = jwtDecode<DecodedToken>(accessToken);
        if (decoded.globalRole === "super_admin") {
          resolvedRoute = "/admin";
        } else if (decoded.globalRole === "manager") {
          resolvedRoute = "/create-mess";
        }
      } catch {
        // ignore
      }
    }

    // --- STALE COOKIE CLEANUP ---
    // If we have an activeMessId but it's not in usableMemberships, clear it from cookies
    let mustClearMessCookie = false;
    if (user && activeMessId) {
      const usable = getUsableMemberships(user.memberships || []);
      const isValid = usable.some(m => {
        const mId = typeof m.messId === "string" ? m.messId : (m.messId as IMess)?._id;
        return mId === activeMessId;
      });
      if (!isValid) {
        mustClearMessCookie = true;
      }
    }

    // 1. If user must go to blocked or verify-otp, force them there
    if (resolvedRoute === "/blocked" || resolvedRoute === "/auth/verify-otp") {
      if (pathname !== resolvedRoute) {
        const res = NextResponse.redirect(new URL(resolvedRoute, request.url));
        if (mustClearMessCookie) res.cookies.delete("activeMessId");
        return res;
      }
      if (mustClearMessCookie) {
         const res = NextResponse.next();
         res.cookies.delete("activeMessId");
         return res;
      }
      return NextResponse.next();
    }

    // 2. If they are trying to access an auth route (like /login), send them to their dashboard
    if (isAuthRouteToRedirect) {
      const res = NextResponse.redirect(new URL(resolvedRoute, request.url));
      if (mustClearMessCookie) res.cookies.delete("activeMessId");
      return res;
    }

    // 3. Strict checks for protected routes
    if (isProtectedRoute) {
      const isAdminRoute = pathname.startsWith("/admin");
      const isManagerRoute = pathname.startsWith("/manager");
      const isMemberRoute = pathname.startsWith("/dashboard");
      const isSelectMessRoute = pathname.startsWith("/select-mess");
      const isOnboardingRoute = 
        pathname.startsWith("/get-started") || 
        pathname.startsWith("/join-mess") || 
        pathname.startsWith("/create-mess") || 
        pathname.startsWith("/pending-approval");

      // Redirect if current path doesn't match resolved route
      const shouldRedirect = 
        (isAdminRoute && resolvedRoute !== "/admin") ||
        (isManagerRoute && resolvedRoute !== "/manager") ||
        (isMemberRoute && resolvedRoute !== "/dashboard") ||
        (isSelectMessRoute && resolvedRoute !== "/select-mess") ||
        (isOnboardingRoute && (resolvedRoute === "/admin" || resolvedRoute === "/manager" || resolvedRoute === "/dashboard"));

      // Special check: If user has a suspended mess, they MUST stay on /get-started
      const hasSuspendedMess = user?.memberships?.some(
        (m: IMembership) => typeof m.messId !== "string" && m.messId?.status === "suspended"
      );

      if (hasSuspendedMess && pathname !== "/get-started") {
        const res = NextResponse.redirect(new URL("/get-started", request.url));
        if (mustClearMessCookie) res.cookies.delete("activeMessId");
        return res;
      }

      if (shouldRedirect) {
        const res = NextResponse.redirect(new URL(resolvedRoute, request.url));
        if (mustClearMessCookie) res.cookies.delete("activeMessId");
        return res;
      }
      
      // No redirect needed, but check if we need to clear cookie
      if (mustClearMessCookie) {
        const res = NextResponse.next();
        res.cookies.delete("activeMessId");
        return res;
      }

      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

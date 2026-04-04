/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

// Define auth and protected routes
const authRoutes = ["/auth/login", "/auth/register", "/auth/verify-otp", "/auth/forgot-password", "/auth/reset-password"];
const protectedRoutes = ["/admin", "/manager", "/dashboard", "/pending-approval", "/create-mess", "/get-started"];

/**
 * Proxy function (Next.js 16+ convention) to handle route protection 
 * and authentication redirects.
 */
export async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Check if token is valid (expired)
  if (accessToken) {
    try {
      const decoded: any = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      
      if (decoded.exp < currentTime) {
        console.log("Token expired, redirecting to login");
        const response = NextResponse.redirect(new URL("/auth/login", request.url));
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

  const isAuthRoute = authRoutes.some((route) => nextUrl.pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));

  // 1. If user is logged in and tries to access auth pages (login, register, etc.)
  // Redirect them to get-started (neutral entry point)
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/get-started", request.url));
  }

  // 2. If user is NOT logged in and tries to access protected pages (dashboard, etc.)
  // Redirect them to the login page
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Continue with the request if no conditions match
  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

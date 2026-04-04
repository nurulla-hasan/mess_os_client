import { IMembership, IUser } from "@/types/user.type";

/**
 * Determines the post-login redirect route based on user state
 *
 * Routing priority:
 * 1. Blocked -> /blocked
 * 2. Not verified -> /auth/verify-otp
 * 3. Super admin -> /admin
 * 4. Approved manager membership -> /manager
 * 5. Approved member membership -> /dashboard
 * 6. Pending membership -> /pending-approval
 * 7. Manager without approved mess -> /create-mess
 * 8. Default -> /get-started
 */
export function getPostLoginRoute(user: IUser | null | undefined): string {
  // Safe fallback if user data is missing
  if (!user) {
    return "/get-started";
  }

  // 1. Check if user is blocked (always check this first)
  if (user.status === "blocked") {
    return "/blocked";
  }

  // 2. Check if user email is verified
  if (!user.isEmailVerified) {
    return "/auth/verify-otp";
  }

  // 3. Use globalRole (backend-aligned field)
  const userRole = user.globalRole;

  // 3. Super admin redirect
  if (userRole === "super_admin") {
    return "/admin";
  }

  // Check for approved memberships first
  const activeMembership = user.activeMembership;
  const memberships = user.memberships ?? [];

  // Prefer activeMembership if present and approved
  if (activeMembership?.status === "approved") {
    if (activeMembership.role === "manager") {
      return "/manager";
    }
    if (activeMembership.role === "member") {
      return "/dashboard";
    }
  }

  // Search in memberships array for approved membership
  const approvedMembership = memberships.find(
    (m: IMembership) => m.status === "approved"
  );

  if (approvedMembership) {
    if (approvedMembership.role === "manager") {
      return "/manager";
    }
    if (approvedMembership.role === "member") {
      return "/dashboard";
    }
  }

  // Check for any pending memberships
  const hasPendingMembership =
    activeMembership?.status === "pending" ||
    memberships.some((m: IMembership) => m.status === "pending");

  if (hasPendingMembership) {
    return "/pending-approval";
  }

  // 7. Manager without approved mess
  if (userRole === "manager") {
    return "/create-mess";
  }

  // 8. Default fallback
  return "/get-started";
}

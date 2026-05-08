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

  // Check for approved/active memberships first
  const activeMembership = user.activeMembership;
  const memberships = user.memberships ?? [];
 
  // Helper to check if a membership is considered "active/approved" AND the mess itself is active
  const isApproved = (m: IMembership) => {
    const isActiveStatus = m.status === "approved" || m.status === "active";
    const mess = m.messId;
    const isMessActive = typeof mess !== "string" && mess?.status === "active";
    return isActiveStatus && isMessActive;
  };
  
  const getRole = (m: IMembership) => m.role || m.messRole;
 
  // 1. Prefer activeMembership if present and approved/active
  if (activeMembership && isApproved(activeMembership)) {
    const role = getRole(activeMembership);
    if (role === "manager") return "/manager";
    if (role === "member") return "/dashboard";
  }
 
  // 2. Search in memberships array for any approved/active membership
  const approvedMembership = memberships.find(isApproved);
 
  if (approvedMembership) {
    const role = getRole(approvedMembership);
    if (role === "manager") return "/manager";
    if (role === "member") return "/dashboard";
  }

  // Check for any pending memberships
  const hasPendingMembership =
    activeMembership?.status === "pending" ||
    memberships.some((m: IMembership) => m.status === "pending");

  if (hasPendingMembership) {
    return "/pending-approval";
  }

  // Check for any suspended memberships
  const hasSuspendedMembership = memberships.some(
    (m: IMembership) => typeof m.messId !== "string" && m.messId?.status === "suspended"
  );

  if (hasSuspendedMembership) {
    return "/get-started";
  }

  // 7. Manager without approved mess
  if (userRole === "manager") {
    return "/create-mess";
  }

  // 8. Default fallback
  return "/get-started";
}

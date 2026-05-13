import { IMembership, IUser } from "@/types/user.type";
import { IMess } from "@/types/mess.type";

/**
 * Helper: Get usable (active) memberships where both
 * membership.status === "active" AND mess.status === "active"
 */
export function getUsableMemberships(memberships: IMembership[]): IMembership[] {
  return memberships.filter((m) => {
    const mess = typeof m.messId === "string" ? null : (m.messId as IMess);
    return m.status === "active" && mess?.status === "active";
  });
}

/**
 * Helper: Get membership role (handles both `role` and `messRole` fields)
 */
export function getMembershipRole(m: IMembership): string | undefined {
  return m.role || m.messRole;
}

/**
 * Determines the post-login redirect route based on user state
 *
 * Routing priority:
 * 1. Blocked                          -> /blocked
 * 2. Not verified                     -> /auth/verify-otp
 * 3. Super admin                      -> /admin
 * 4. Existing Valid Active Mess       -> /manager or /dashboard
 * 5. 1 usable active mess             -> /manager or /dashboard
 * 6. 2+ usable active mess            -> /select-mess
 * 7. Pending membership               -> /pending-approval
 * 8. Manager without usable mess      -> /create-mess
 * 9. Default                          -> /get-started
 */
export function getPostLoginRoute(
  user: IUser | null | undefined, 
  activeMessId?: string | null
): string {
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

  // 3. Super admin redirect
  if (user.globalRole === "super_admin") {
    return "/admin";
  }

  const memberships = user.memberships ?? [];
  const usableMemberships = getUsableMemberships(memberships);

  // 4. If we have an activeMessId cookie, check if it's still usable
  if (activeMessId) {
    const currentMembership = usableMemberships.find((m) => {
      const mId = typeof m.messId === "string" ? m.messId : (m.messId as IMess)?._id;
      return mId === activeMessId;
    });

    if (currentMembership) {
      const role = getMembershipRole(currentMembership);
      if (role === "manager") return "/manager";
      if (role === "member") return "/dashboard";
    }
    // If cookie is stale (not in usableMemberships), we fall through to normal logic
  }

  // 5. Exactly one usable mess — auto-route based on role
  if (usableMemberships.length === 1) {
    const role = getMembershipRole(usableMemberships[0]);
    if (role === "manager") return "/manager";
    if (role === "member") return "/dashboard";
  }

  // 6. Multiple usable messes — user must choose
  if (usableMemberships.length >= 2) {
    return "/select-mess";
  }

  // 7. Check for any pending memberships
  const hasPendingMembership = memberships.some(
    (m: IMembership) => m.status === "pending"
  );

  if (hasPendingMembership) {
    return "/pending-approval";
  }

  // 8. Check for suspended mess (inform user on get-started)
  const hasSuspendedMembership = memberships.some(
    (m: IMembership) => {
      const mess = typeof m.messId === "string" ? null : (m.messId as IMess);
      return mess?.status === "suspended";
    }
  );

  if (hasSuspendedMembership) {
    return "/get-started";
  }

  // 9. Manager without usable mess
  if (user.globalRole === "manager") {
    return "/create-mess";
  }

  // 10. Default fallback
  return "/get-started";
}

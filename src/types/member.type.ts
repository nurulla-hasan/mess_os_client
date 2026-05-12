export type MemberStatus = "active" | "pending" | "removed" | "inactive";
export type MessRole = "manager" | "member";

export interface IMember {
  _id: string;
  messId: string;
  messRole: MessRole;
  status: MemberStatus;
  joinedAt?: string;
  leftAt?: string;
  createdAt: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  dueAmount?: number;
  advanceAmount?: number;
}

/**
 * Lightweight type for the /members/options endpoint.
 * Used in dropdowns/selects — no pagination, active members only.
 */
export interface IMemberOption {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  messRole: MessRole;
}

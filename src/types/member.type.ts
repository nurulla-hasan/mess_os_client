export type MemberStatus = "active" | "pending" | "removed" | "inactive";
export type MessRole = "manager" | "member";

export interface IMember {
  id: string;
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

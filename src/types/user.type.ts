export type GlobalRole = "user" | "manager" | "super_admin";
export type UserStatus = "active" | "blocked";
export type MembershipRole = "manager" | "member";
export type MembershipStatus = "pending" | "approved" | "rejected";

export interface IMembership {
  messId: string;
  role: MembershipRole;
  status: MembershipStatus;
}

export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatarUrl?: string;
  globalRole: GlobalRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: UserStatus;
  memberships?: IMembership[];
  activeMembership?: IMembership | null;
  createdAt: string;
  updatedAt: string;
}
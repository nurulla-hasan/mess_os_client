export type GlobalRole = "user" | "manager" | "super_admin";
export type UserStatus = "active" | "blocked";
export type MembershipRole = "manager" | "member";
export type MembershipStatus = "pending" | "approved" | "rejected" | "active";

import { IMess } from "./mess.type";

export interface IMembership {
  _id?: string;
  messId: string | IMess;
  role?: MembershipRole; // Keep for backward compatibility
  messRole?: MembershipRole; // Backend uses this
  status: MembershipStatus;
  joinedAt?: string;
}

export interface IUser {
  _id: string;
  id?: string;
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
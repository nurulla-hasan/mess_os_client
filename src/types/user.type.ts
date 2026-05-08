export type GlobalRole = "user" | "manager" | "super_admin";
export type UserStatus = "active" | "blocked";
export type MembershipRole = "manager" | "member";
export type MembershipStatus = "pending" | "approved" | "rejected" | "active";
export type RequestStatus = "pending" | "approved" | "rejected";

export interface IManagerRequest {
  _id: string;
  userId: string;
  status: RequestStatus;
  reason: string;
  createdAt: string;
  updatedAt: string;
}


export interface IMembership {
  _id?: string;
  messId: string | {
    _id: string;
    name: string;
    address?: string;
    status: string;
  };
  role?: MembershipRole; // Keep for backward compatibility
  messRole?: MembershipRole; // Backend uses this
  status: MembershipStatus;
  joinedAt?: string;
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
export type UserRole = "super_admin" | "manager" | "member";

export interface IUser {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  profileImage?: string;
  address?: string;
  messId?: string;
  createdAt: string;
  updatedAt: string;
}

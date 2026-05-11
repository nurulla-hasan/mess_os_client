import { IUser } from "./user.type";

export type MessStatus = "active" | "suspended" | "closed";

export interface IMess {
  _id: string;
  name: string;
  address: string;
  inviteCode: string;
  status: MessStatus;
  settings?: {
    mealCategories: string[];
    equalShareCategories: string[];
  };
  createdAt: string;
  updatedAt: string;
  memberCount?: number;
  manager?: IUser;
  suspendedAt?: string;
  suspendedBy?: string;
  suspensionNote?: string;
}

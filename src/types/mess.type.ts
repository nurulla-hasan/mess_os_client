import { IUser } from "./user.type";

export type MessStatus = "active" | "suspended" | "pending";

export interface IMess {
  id: string;
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
}

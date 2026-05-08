import { IUser } from "./user.type";

export type RequestStatus = "pending" | "approved" | "rejected";

export interface IManagerRequest {
  _id: string;
  userId: string | IUser;
  status: RequestStatus;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

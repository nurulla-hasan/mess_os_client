import { IMember } from "./member.type";

export type MealOffRequestStatus = "pending" | "approved" | "rejected" | "canceled";

export interface IMealOffRequest {
  _id: string;
  messId: string;
  messMemberId: IMember;
  startDate: string;
  endDate: string;
  status: MealOffRequestStatus;
  reason: string;
  adminNote?: string;
  reviewedBy?: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMealOffRequestSummary {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
}

import { IUser } from "./user.type";

export type PaymentStatus = "pending" | "approved" | "rejected" | "canceled";
export type PaymentMethod = "cash" | "bkash" | "nagad" | "rocket" | "bank";

export interface IPayment {
  _id: string;
  messId: string;
  messMemberId: string | IUser; // Sometimes expanded, sometimes just ID string
  amount: number;
  method: PaymentMethod;
  reference?: string;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

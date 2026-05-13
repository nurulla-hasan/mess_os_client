import type { IMemberParticipation, MessRole, MemberStatus } from "./member.type";

export type PaymentStatus = "pending" | "approved" | "rejected" | "canceled";
export type PaymentMethod = "cash" | "bkash" | "nagad" | "rocket" | "bank" | string;

export interface IPaymentUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  avatar?: string;
}

export interface IPaymentMember {
  _id: string;
  userId?: IPaymentUser;
  user?: IPaymentUser;
  messRole: MessRole;
  status: MemberStatus;
  participation?: IMemberParticipation;
}

export interface IPayment {
  _id: string;
  messId: string;
  messMemberId: string | IPaymentMember;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  status: PaymentStatus;
  approvedBy?: string | IPaymentUser;
  receivedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  messMemberId?: string;
  amount: number;
  method: string;
  reference?: string;
}

import { IPaymentUser } from "./payment.type";
import { MessRole, MemberStatus } from "./member.type";

export type BillingStatus = "draft" | "finalized" | "archived";
export type BillStatus = "unpaid" | "partially_paid" | "paid";

export interface IBillingSummary {
  totalMeals: number;
  totalMealExpense: number;
  totalEqualShareExpense: number;
  mealRate: number;
}

export interface IBillingCycle {
  _id: string;
  messId: string;
  year: number;
  month: number;
  startDate: string;
  endDate: string;
  status: BillingStatus;
  summary: IBillingSummary;
  finalizedAt?: string;
  finalizedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMemberBillSummary {
  meals: number;
  mealRate: number;
  mealCharge: number;
  equalShare: number;
  previousDue: number;
  totalPaymentsAndCredits: number;
  finalPayable: number;
  finalDue: number;
  finalAdvance: number;
}

export interface IMemberBill {
  _id: string;
  messId: string;
  billingCycleId: string;
  messMemberId: {
    _id: string;
    messRole: MessRole;
    status: MemberStatus;
    joinedAt: string;
    user: IPaymentUser;
  };
  status: BillStatus;
  isArchived: boolean;
  summary: IMemberBillSummary;
  createdAt: string;
  updatedAt: string;
}

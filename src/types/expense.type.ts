import { IUser } from "./user.type";

export type ExpenseStatus = "pending" | "approved" | "rejected" | "canceled";
export type FundSource = "mess_cash" | "personal_cash";
export type ReimbursementStatus = "not_applicable" | "pending" | "reimbursed";

export interface IExpense {
  _id: string;
  messId: string;
  category: string;
  amount: number;
  date: string;
  paidBy: {
    _id: string;
    userId: IUser & { avatar?: string };
    messRole: string;
    status: string;
    participation: {
      meals: boolean;
      sharedExpenses: boolean;
    };
  };
  fundSource: FundSource;
  status: ExpenseStatus;
  reimbursementStatus: ReimbursementStatus;
  receiptUrl?: string;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpensePayload {
  category: string;
  amount: number;
  date: string;
  fundSource: FundSource;
  paidBy?: string; // Optional for members, manager can specify another member ID
  receiptUrl?: string;
}

export type UtilityStatus = "unpaid" | "paid" | "partially_paid";

export type UtilityCategory = string;

export interface IUtilityBill {
  _id: string;
  messId: string;
  category: UtilityCategory;
  amount: number;
  billingMonth: number;
  year: number;
  dueDate: string;
  status: UtilityStatus;
  paidAt?: string;
  paidBy?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

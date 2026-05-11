import { IMember } from "./member.type";

export type MarketScheduleStatus = "pending" | "completed" | "void";

export interface IShoppingItem {
  _id: string;
  name: string;
  quantity: string;
}

export interface IMarketSchedule {
  _id: string;
  messId: string;
  assignedTo: IMember[];
  targetDate: string;
  shoppingItems: IShoppingItem[];
  estimatedBudget: number;
  actualCost?: number;
  status: MarketScheduleStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

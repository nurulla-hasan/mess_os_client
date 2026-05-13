export type AiShoppingStatus = "draft" | "approved" | "rejected" | "converted";

export interface IAiShoppingItem {
  _id?: string;
  name: string;
  quantity: string;
  category: string;
}

export interface IAiShoppingList {
  _id: string;
  messId: string;
  menuPlanId: string;
  targetDate: string;
  items: IAiShoppingItem[];
  status: AiShoppingStatus;
  marketScheduleId?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
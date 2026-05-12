
export type MenuPlanStatus = "draft" | "published" | "archived";

export interface IMenuPlan {
  _id: string;
  messId: string;
  date: string;
  meals: Record<string, string>;
  status: MenuPlanStatus;
  isAiGenerated: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetMenuPlansParams {
  page?: number;
  limit?: number;
  status?: MenuPlanStatus;
  startDate?: string;
  endDate?: string;
}

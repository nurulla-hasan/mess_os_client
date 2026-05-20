import type { IMemberParticipation } from "./member.type";

export interface IMealBreakdown {
  Breakfast?: number;
  Lunch?: number;
  Dinner?: number;
  Guest?: number;
  [key: string]: number | undefined;
}

export interface IMeal {
  _id: string;
  messId: string;
  date: string;
  messMemberId: {
    _id: string;
    userId: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      avatar?: string;
    };
    messRole: string;
    status: string;
    participation?: IMemberParticipation;
  };
  meals: IMealBreakdown;
  mealCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMealSummary {
  totalMeals: number;
  totalRecords: number;
}

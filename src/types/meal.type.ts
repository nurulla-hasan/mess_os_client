export interface IMealBreakdown {
  Breakfast: number;
  Lunch: number;
  Dinner: number;
  Guest: number;
  [key: string]: number;
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
      avatarUrl?: string;
    };
    messRole: string;
    status: string;
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

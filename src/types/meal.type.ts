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
  mealCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMealSummary {
  totalMeals: number;
  totalRecords: number;
}

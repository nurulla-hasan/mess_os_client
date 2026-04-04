export interface IMember {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    profileImage?: string;
    role: string;
  };
  messId: string;
  totalMeals: number;
  totalDeposits: number;
  currentBalance: number;
  balance?: number; // Backend calculated balance fallback
  status: "active" | "inactive";
  createdAt: string;
  updatedAt?: string;
}

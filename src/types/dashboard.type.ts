

export interface IMemberSummaryItem {
  memberId: string;
  user: {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    profileImage?: string;
    role: string;
  };
  totalDeposit: number;
  totalMeals: number;
  mealCost: number;
  utilityCost: number;
  totalCost: number;
  balance: number;
  status: string;
}

export interface IRecentExpenseItem {
  _id: string;
  category: string;
  itemName: string;
  amount: number;
  buyerName: string;
  date: string;
}

export interface IRecentDepositItem {
  _id: string;
  amount: number;
  memberName: string;
  date: string;
}

export interface IUpcomingBillItem {
  _id: string;
  category: string;
  amount: number;
  dueDate: string;
  month: string;
}

export interface IDashboardStats {
  month: string;
  userStats: {
    balance: number;
    totalDeposit: number;
    totalMeals: number;
    todayStatus: {
      breakfast: number;
      lunch: number;
      dinner: number;
      guest: number;
      total: number;
      isOn: boolean;
    };
  };
  messStats: {
    totalDeposit: number;
    totalExpense: number;
    totalUtilityExpense: number;
    totalLoss: number;
    totalIncome: number;
    totalMeals: number;
    messBalance: number;
    mealRate: number;
    activeMembers: number;
    utilityCostPerMember: number;
  };
  memberSummaries: IMemberSummaryItem[];
  recentExpenses: IRecentExpenseItem[];
  recentDeposits: IRecentDepositItem[];
  upcomingBills: IUpcomingBillItem[];
}

export interface IMessSummary {
  month: string;
  totalDeposit: number;
  totalExpense: number;
  totalUtilityExpense: number;
  totalLoss: number;
  totalIncome: number;
  totalMeals: number;
  mealRate: number;
  utilityCostPerMember: number;
  memberSummaries: {
    memberId: string;
    user: {
      _id: string;
      fullname: string;
      email: string;
      phone: string;
      role: string;
    };
    totalDeposit: number;
    totalMeals: number;
    mealCost: number;
    utilityCost: number;
    totalCost: number;
    balance: number;
  }[];
}

export interface IExpense {
  _id: string;
  date: string;
  messId: string;
  buyerId: {
    _id: string;
    fullname: string;
  } | null;
  details: {
    category: string;
    itemName: string;
    amount: number;
    _id: string;
  }[];
  totalAmount: number;
  receiptUrl: string;
  paymentSource: string;
  adjustment: number;
  addedBy: {
    _id: string;
    fullname: string;
    email: string;
  };
  status: string;
  verifiedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDeposit {
  _id: string;
  date: string;
  messId: string;
  memberId: {
    _id: string;
    fullname: string;
  } | null;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  addedBy: {
    _id: string;
    fullname: string;
    email: string;
  };
  status: string;
  verifiedBy: string;
  note: string;
  createdAt: string;
  updatedAt: string;
}

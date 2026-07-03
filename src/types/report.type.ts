export interface IReportSummary {
  totalMessCash: number;
  pendingExpenses: number;
  pendingPayments: number;
  finalizedCycles: number;
}

export interface IFinancialReport {
  _id: string;
  messId: string;
  month: number;
  year: number;
  startDate: string;
  endDate: string;
  status: "finalized" | "pending";
  summary: {
    totalMeals: number;
    totalMealExpense: number;
    totalEqualShareExpense: number;
    mealRate: number;
  };
  finalizedAt?: string;
  finalizedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILedger {
  _id: string;
  messId: string;
  messMemberId: string;
  type: "credit" | "charge";
  amount: number;
  referenceType: string;
  referenceId: string;
  description: string;
  date: string;
  isVoided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IHistoricalFinalization {
  _id: string;
  messId: string;
  messMemberId: string;
  billingCycleId: string;
  summary: {
    meals: number;
    mealRate: number;
    mealCharge: number;
    equalShare: number;
    previousDue: number;
    totalPaymentsAndCredits: number;
    finalPayable: number;
    finalDue: number;
    finalAdvance: number;
  };
  status: "paid" | "unpaid";
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMemberStatement {
  member: {
    _id: string;
    messRole: string;
    status: string;
    joinedAt: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      avatar: string;
    };
  };
  historicalFinalizations: IHistoricalFinalization[];
  ledgers: ILedger[];
  liveCurrentBalance: number;
  estimatedMealCharge?: number;
}

export interface IExpenseReportItem {
  _id: string;
  messId: string;
  category: string;
  amount: number;
  date: string;
  paidBy: {
    _id: string;
    messRole: string;
    status: string;
    participation: {
      meals: boolean;
      sharedExpenses: boolean;
    };
    user: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      avatar: string;
    };
  };
  fundSource: string;
  status: "approved";
  reimbursementStatus: string;
  approvedBy: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
  };
  approvedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IExpensesReport {
  summary: {
    totalAmount: number;
    totalRecords: number;
  };
  data: IExpenseReportItem[];
}

export interface IPaymentReportItem {
  _id: string;
  messId: string;
  reference: string;
  amount: number;
  method: string;
  status: "approved";
  receivedDate: string;
  messMemberId: {
    _id: string;
    messRole: string;
    status: string;
    participation: {
      meals: boolean;
      sharedExpenses: boolean;
    };
    user: {
      _id: string;
      fullName: string;
      email: string;
      phone: string;
      avatar: string;
    };
  };
  approvedBy: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentsReport {
  summary: {
    totalAmount: number;
    totalRecords: number;
  };
  data: IPaymentReportItem[]; 
}

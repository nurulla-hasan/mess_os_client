import { IMess } from "./mess.type";
import { ISubscriptionPlan } from "./subscription.type";

export interface ISubscriptionInfo {
  _id: string;
  messId: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  currentPeriodEnd: string;
  currentPeriodStart: string;
  planId: string;
  status: string;
  updatedAt: string;
  plan: ISubscriptionPlan;
}

export interface IDashboardSummary {
  activeMembers: number;
  pendingJoinRequests: number;
  todayMeals: number;
  todayMealRecords: number;
  pendingPaymentsAmount: number;
  pendingPaymentsCount: number;
  monthlyExpensesAmount: number;
  monthlyExpensesCount: number;
  monthlyUtilitiesAmount: number;
  monthlyUtilitiesCount: number;
  pendingExpensesAmount: number;
  pendingExpensesCount: number;
  unpaidUtilities: number;
  openComplaints: number;
  pendingMarketDuties: number;
  totalMessFund: number;
  totalDeposits: number;
  totalCashOut: number;
  estimatedMealRate: number;
  estimatedMealExpense: number;
  estimatedTotalMeals: number;
}

export interface ITodayStats {
  date: string;
  mealBreakdown: {
    [key: string]: number;
  };
}

export interface INoticeItem {
  _id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdBy: string;
  createdAt: string;
}

export interface IPendingActions {
  joinRequests: number;
  payments: number;
  expenses: number;
  utilities: number;
  complaints: number;
  marketDuties: number;
}

export interface IManagerDashboardData {
  mess: IMess;
  subscription: ISubscriptionInfo;
  selfBalance?: {
    type: "due" | "advance" | "settled";
    amount: number;
    finalDue: number;
    finalAdvance: number;
    isEstimated?: boolean;
    estimatedMealCharge?: number;
    myMeals?: number;
  } | null;
  summary: IDashboardSummary;
  today: ITodayStats;
  recent: {
    notices: INoticeItem[];
  };
  pendingActions: IPendingActions;
}

export interface IBillingInfo {
  activeCycle: {
    _id: string;
    year: number;
    month: number;
    status: string;
    summary: {
      totalMeals: number;
      totalMealExpense: number;
      totalEqualShareExpense: number;
      mealRate: number;
    };
  };
  latestBill: {
    _id: string;
    status: string;
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
  };
  balance: {
    type: "due" | "advance" | "settled";
    amount: number;
    finalDue: number;
    finalAdvance: number;
    source: "latest_bill" | "running_ledger";
    isEstimated?: boolean;
    estimatedMealCharge?: number;
    status: string | null;
  };
}

export interface IMealStats {
  month: number;
  year: number;
  total: number;
  records: number;
  breakdown: {
    [key: string]: number;
  };
  estimatedMealRate: number;
  estimatedMealExpense: number;
  estimatedTotalMeals: number;
}

export interface IMarketDutyAssignee {
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
}

export interface IMarketDuty {
  next: {
    _id: string;
    targetDate: string;
    shoppingItems: {
      name: string;
      quantity: string;
      _id: string;
    }[];
    estimatedBudget: number;
    status: string;
    assignedTo: IMarketDutyAssignee[];
  } | null;
}

export interface IRecentActivity {
  type: "payment" | "notice";
  title: string;
  description: string;
  status?: string;
  amount?: number;
  createdAt: string;
  refId: string;
}

export interface IDashboardPayment {
  _id: string;
  reference: string;
  amount: number;
  createdAt: string;
  method: string;
  receivedDate: string;
  status: string;
  updatedAt: string;
}

export interface IMemberDashboardData {
  mess: IMess;
  subscription: ISubscriptionInfo;
  member: {
    _id: string;
    role: string;
  };
  billing: IBillingInfo;
  meals: IMealStats;
  marketDuty: IMarketDuty;
  recent: {
    activity: IRecentActivity[];
    payments: IDashboardPayment[];
    notices: INoticeItem[];
  };
  quickLinks: {
    [key: string]: boolean;
  };
}

export interface IEstimatedMealRate {
  rate: number;
  mealExpense: number;
  totalMeals: number;
}

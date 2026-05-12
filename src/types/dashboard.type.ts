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
  pendingExpensesAmount: number;
  pendingExpensesCount: number;
  unpaidUtilities: number;
  openComplaints: number;
  pendingMarketDuties: number;
  totalMessFund: number;
  totalDeposits: number;
  totalCashOut: number;
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
  summary: IDashboardSummary;
  today: ITodayStats;
  recent: {
    notices: INoticeItem[];
  };
  pendingActions: IPendingActions;
}

export interface ISubscriptionFeatures {
  meals: boolean;
  expenses: boolean;
  billing: boolean;
  reports: boolean;
  marketSchedule: boolean;
  aiShopping: boolean;
  notices: boolean;
  complaints: boolean;
  prioritySupport: boolean;
}

export interface ISubscriptionPlan {
  _id: string;
  name: string;
  code: string;
  price: number;
  currency: string;
  billingCycle: string;
  durationDays?: number;
  maxMembers: number;
  features: ISubscriptionFeatures;
  isDefault: boolean;
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMessSubscription {
  _id: string;
  messId: string;
  planId: string;
  status: "active" | "past_due" | "canceled" | "unpaid";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
  plan: ISubscriptionPlan;
}

export interface ISubscriptionLog {
  _id: string;
  messId: string;
  planId: string;
  action: "subscribed" | "canceled" | "payment_failed" | "fallback_to_default" | "expired" | string;
  amount: number;
  note?: string;
  createdAt: string;
}

export interface ISubscriptionHistory {
  subscription: {
    _id: string;
    messId: string;
    planId: string;
    status: "active" | "past_due" | "canceled" | "unpaid";
    currentPeriodStart: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    updatedAt: string;
  };
  mess: {
    _id: string;
    name: string;
    address: string;
    inviteCode: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  manager: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    status: string;
    avatar?: string;
  };
  plan: ISubscriptionPlan;
}

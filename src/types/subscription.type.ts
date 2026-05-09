export interface ISubscriptionPlan {
  _id: string;
  name: string;
  code: string;
  price: number;
  currency: string;
  billingCycle: string;
  durationDays?: number;
  maxMembers: number;
  features: Record<string, boolean>;
  isDefault: boolean;
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISubscriptionHistory {
  subscription: {
    _id: string;
    id: string;
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
    id: string;
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
    avatarUrl?: string;
  };
  plan: ISubscriptionPlan;
}

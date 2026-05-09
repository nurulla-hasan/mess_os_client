
export interface IPlatformAnalytics {
  summary: {
    users: {
      total: number;
      active: number;
      blocked: number;
    };
    managers: {
      total: number;
      active: number;
      blocked: number;
    };
    messes: {
      total: number;
      active: number;
      suspended: number;
    };
    members: {
      active: number;
    };
    subscriptions: {
      total: number;
      active: number;
      paidActive: number;
      freeActive: number;
      estimatedMonthlyRecurringRevenue: number;
      currency: string;
      byStatus: Array<{
        status: string;
        count: number;
      }>;
      byPlan: Array<{
        planId: string;
        planName: string;
        price: number;
        currency: string;
        billingCycle: string;
        count: number;
        active: number;
      }>;
      recent: {
        subscribedLast7Days: number;
        paymentFailedLast7Days: number;
      };
    };
    pendingManagerRequests: number;
  };
  trends: {
    dailyNewUsers: Array<{
      date: string;
      count: number;
    }>;
    dailyNewMesses: Array<{
      date: string;
      count: number;
    }>;
  };
  labels: {
    userGrowth: string;
    messGrowth: string;
  };
}

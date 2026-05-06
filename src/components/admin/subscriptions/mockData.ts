import { AdminSubscription } from "./columns";

export const mockAdminSubscriptions: AdminSubscription[] = [
  {
    id: "s1",
    messName: "Green House Mess",
    plan: "Standard",
    status: "active",
    nextRenewal: "2024-06-01T00:00:00Z",
    totalRevenue: 2500,
  },
  {
    id: "s2",
    messName: "Sky View Mess",
    plan: "Premium",
    status: "active",
    nextRenewal: "2024-06-15T00:00:00Z",
    totalRevenue: 5000,
  },
  {
    id: "s3",
    messName: "Starter Mess",
    plan: "Starter",
    status: "trial",
    nextRenewal: "2024-05-20T00:00:00Z",
    totalRevenue: 0,
  },
  {
    id: "s4",
    messName: "Old Mess",
    plan: "Standard",
    status: "expired",
    nextRenewal: "2024-04-01T00:00:00Z",
    totalRevenue: 1500,
  },
];

import { UtilityBill } from "./columns";

export const mockUtilityBills: UtilityBill[] = [
  {
    id: "u1",
    category: "rent",
    amount: 15000,
    month: "May",
    year: 2024,
    dueDate: "2024-05-10T00:00:00Z",
    status: "pending",
  },
  {
    id: "u2",
    category: "internet",
    amount: 800,
    month: "May",
    year: 2024,
    dueDate: "2024-05-05T00:00:00Z",
    status: "paid",
    paidAt: "2024-05-04T12:00:00Z",
  },
  {
    id: "u3",
    category: "electricity",
    amount: 2450,
    month: "April",
    year: 2024,
    dueDate: "2024-04-25T00:00:00Z",
    status: "paid",
    paidAt: "2024-04-24T10:00:00Z",
  },
];

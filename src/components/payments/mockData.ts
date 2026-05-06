import { Payment } from "./columns";

export const mockPayments: Payment[] = [
  {
    id: "p1",
    member: { name: "Golap Hasan", email: "golap@example.com" },
    amount: 1500,
    method: "bkash",
    reference: "TRX987654321",
    status: "approved",
    submittedAt: "2024-05-01T10:00:00Z",
    notes: "Monthly mess fee deposit",
  },
  {
    id: "p2",
    member: { name: "Rahim Uddin", email: "rahim@example.com" },
    amount: 2000,
    method: "cash",
    status: "pending",
    submittedAt: "2024-05-05T14:30:00Z",
  },
  {
    id: "p3",
    member: { name: "Tanvir Hasan", email: "tanvir@example.com" },
    amount: 500,
    method: "nagad",
    reference: "NGD1234567",
    status: "pending",
    submittedAt: "2024-05-06T09:15:00Z",
  },
  {
    id: "p4",
    member: { name: "Karim Ahmed", email: "karim@example.com" },
    amount: 1000,
    method: "rocket",
    status: "rejected",
    submittedAt: "2024-04-28T16:00:00Z",
    notes: "Invalid reference number provided",
  },
];

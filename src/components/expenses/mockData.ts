import { Expense } from "./columns";

export const mockExpenses: Expense[] = [
  {
    id: "e1",
    category: "bazar",
    amount: 1250,
    date: "2024-05-05T08:00:00Z",
    paidBy: { name: "Golap Hasan", email: "golap@example.com" },
    fundSource: "mess_fund",
    status: "approved",
    reimbursementStatus: "not_required",
    receiptUrl: "https://example.com/receipt1.jpg",
    notes: "Weekly grocery bazar",
  },
  {
    id: "e2",
    category: "utility",
    amount: 3500,
    date: "2024-05-02T10:30:00Z",
    paidBy: { name: "Tanvir Hasan", email: "tanvir@example.com" },
    fundSource: "member_reimbursement",
    status: "pending",
    reimbursementStatus: "pending",
    notes: "Electricity bill for April",
  },
  {
    id: "e3",
    category: "other",
    amount: 450,
    date: "2024-05-04T16:00:00Z",
    paidBy: { name: "Karim Ahmed", email: "karim@example.com" },
    fundSource: "manager_pocket",
    status: "approved",
    reimbursementStatus: "completed",
    notes: "New water filter candle",
  },
];

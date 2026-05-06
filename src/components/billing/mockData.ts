import { MemberBill } from "./columns";

export const mockMemberBills: MemberBill[] = [
  {
    id: "b1",
    member: { name: "Golap Hasan", email: "golap@example.com" },
    meals: 124,
    mealCharge: 3720,
    equalShare: 800,
    previousDue: 0,
    credits: 2500,
    finalDue: 2020,
    status: "partial",
  },
  {
    id: "b2",
    member: { name: "Rahim Uddin", email: "rahim@example.com" },
    meals: 110,
    mealCharge: 3300,
    equalShare: 800,
    previousDue: 450,
    credits: 0,
    finalDue: 4550,
    status: "pending",
  },
  {
    id: "b3",
    member: { name: "Karim Ahmed", email: "karim@example.com" },
    meals: 130,
    mealCharge: 3900,
    equalShare: 800,
    previousDue: 0,
    credits: 5000,
    finalDue: -300,
    status: "paid",
  },
];

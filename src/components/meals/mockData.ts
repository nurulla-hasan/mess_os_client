import { MealRecord } from "./columns";

export const mockMeals: MealRecord[] = [
  {
    id: "m1",
    member: { name: "Golap Hasan", email: "golap@example.com" },
    date: "2024-05-06T00:00:00Z",
    count: 2,
    createdAt: "2024-05-06T08:00:00Z",
    updatedAt: "2024-05-06T08:00:00Z",
  },
  {
    id: "m2",
    member: { name: "Rahim Uddin", email: "rahim@example.com" },
    date: "2024-05-06T00:00:00Z",
    count: 3,
    createdAt: "2024-05-06T08:05:00Z",
    updatedAt: "2024-05-06T08:05:00Z",
  },
  {
    id: "m3",
    member: { name: "Tanvir Hasan", email: "tanvir@example.com" },
    date: "2024-05-06T00:00:00Z",
    count: 0,
    createdAt: "2024-05-06T08:10:00Z",
    updatedAt: "2024-05-06T08:10:00Z",
  },
];

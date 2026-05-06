import { MealOffRequest } from "./off-requests-columns";

export const mockOffRequests: MealOffRequest[] = [
  {
    id: "or1",
    member: { name: "Golap Hasan", email: "golap@example.com" },
    startDate: "2024-05-10T00:00:00Z",
    endDate: "2024-05-12T00:00:00Z",
    reason: "Going to home for weekend",
    status: "pending",
    submittedAt: "2024-05-06T10:00:00Z",
  },
  {
    id: "or2",
    member: { name: "Rahim Uddin", email: "rahim@example.com" },
    startDate: "2024-05-15T00:00:00Z",
    endDate: "2024-05-20T00:00:00Z",
    reason: "Family vacation",
    status: "approved",
    submittedAt: "2024-05-04T12:00:00Z",
  },
  {
    id: "or3",
    member: { name: "Nasir Uddin", email: "nasir@example.com" },
    startDate: "2024-05-25T00:00:00Z",
    endDate: "2024-05-28T00:00:00Z",
    reason: "Office tour",
    status: "pending",
    submittedAt: "2024-05-06T14:00:00Z",
  },
];

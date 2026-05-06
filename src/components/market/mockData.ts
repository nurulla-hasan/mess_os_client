import { MarketSchedule } from "./columns";

export const mockSchedules: MarketSchedule[] = [
  {
    id: "s1",
    targetDate: "2024-05-07T00:00:00Z",
    assignedMembers: [{ name: "Rahim Uddin" }, { name: "Karim Ahmed" }],
    itemCount: 12,
    estimatedBudget: 2500,
    status: "pending",
  },
  {
    id: "s2",
    targetDate: "2024-05-04T00:00:00Z",
    assignedMembers: [{ name: "Tanvir Hasan" }],
    itemCount: 5,
    estimatedBudget: 1200,
    actualSpent: 1150,
    status: "completed",
  },
  {
    id: "s3",
    targetDate: "2024-05-01T00:00:00Z",
    assignedMembers: [{ name: "Golap Hasan" }],
    itemCount: 8,
    estimatedBudget: 1500,
    status: "voided",
  },
];

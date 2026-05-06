import { Notice } from "./columns";

export const mockNotices: Notice[] = [
  {
    id: "n1",
    title: "Monthly Mess Meeting - May 2024",
    status: "active",
    isPinned: true,
    createdAt: "2024-05-01T09:00:00Z",
    author: "Golap Hasan",
  },
  {
    id: "n2",
    title: "New Meal Rates Effective from Next Week",
    status: "active",
    isPinned: false,
    createdAt: "2024-05-04T14:30:00Z",
    author: "Golap Hasan",
  },
  {
    id: "n3",
    title: "Internet Service Maintenance Notice",
    status: "archived",
    isPinned: false,
    createdAt: "2024-04-20T10:00:00Z",
    author: "Golap Hasan",
  },
];

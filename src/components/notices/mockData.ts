import { INotice } from "@/types/notice.type";

export const mockNotices: INotice[] = [
  {
    _id: "n1",
    messId: "mess1",
    title: "Monthly Mess Meeting - May 2024",
    status: "active",
    isPinned: true,
    createdAt: "2024-05-01T09:00:00Z",
    updatedAt: "2024-05-01T09:00:00Z",
    createdBy: {
      _id: "u1",
      fullName: "Golap Hasan",
      email: "golap@example.com",
      phone: "01700000000",
      avatar: "",
    },
    content: "Important meeting to discuss mess issues."
  },
  {
    _id: "n2",
    messId: "mess1",
    title: "New Meal Rates Effective from Next Week",
    status: "active",
    isPinned: false,
    createdAt: "2024-05-04T14:30:00Z",
    updatedAt: "2024-05-04T14:30:00Z",
    createdBy: {
      _id: "u1",
      fullName: "Golap Hasan",
      email: "golap@example.com",
      phone: "01700000000",
      avatar: "",
    },
    content: "New rates will be applicable from Monday."
  },
  {
    _id: "n3",
    messId: "mess1",
    title: "Internet Service Maintenance Notice",
    status: "archived",
    isPinned: false,
    createdAt: "2024-04-20T10:00:00Z",
    updatedAt: "2024-04-20T10:00:00Z",
    createdBy: {
      _id: "u1",
      fullName: "Golap Hasan",
      email: "golap@example.com",
      phone: "01700000000",
      avatar: "",
    },
    content: "Maintenance scheduled for Sunday."
  },
];

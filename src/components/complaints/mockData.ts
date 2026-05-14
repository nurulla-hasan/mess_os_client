import { IComplaint } from "@/types/complaint.type";

export const mockComplaints: IComplaint[] = [
  {
    _id: "c1",
    messId: "mess1",
    title: "Internet not working in Room 302",
    messMemberId: {
      _id: "m1",
      messRole: "member",
      status: "active",
      participation: { meals: true, sharedExpenses: true },
      user: {
        _id: "u1",
        fullName: "Nasir Uddin",
        email: "nasir@example.com",
        phone: "01712345678",
        avatar: "",
      }
    },
    status: "open",
    createdAt: "2024-05-06T10:00:00Z",
    updatedAt: "2024-05-06T10:00:00Z",
    description: "The wifi router in our corridor seems to be down since this morning. Please check the connection.",
  },
  {
    _id: "c2",
    messId: "mess1",
    title: "Bathroom tap leaking",
    messMemberId: {
      _id: "m2",
      messRole: "member",
      status: "active",
      participation: { meals: true, sharedExpenses: true },
      user: {
        _id: "u2",
        fullName: "Tanvir Hasan",
        email: "tanvir@example.com",
        phone: "01712345679",
        avatar: "",
      }
    },
    status: "in_progress",
    createdAt: "2024-05-05T14:00:00Z",
    updatedAt: "2024-05-05T14:00:00Z",
    description: "Common bathroom 2nd floor tap is leaking. Plumber needs to be called.",
  },
  {
    _id: "c3",
    messId: "mess1",
    title: "Meal quality feedback - Salt was too high",
    messMemberId: {
      _id: "m3",
      messRole: "member",
      status: "active",
      participation: { meals: true, sharedExpenses: true },
      user: {
        _id: "u3",
        fullName: "Karim Ahmed",
        email: "karim@example.com",
        phone: "01712345680",
        avatar: "",
      }
    },
    status: "resolved",
    createdAt: "2024-05-03T20:00:00Z",
    updatedAt: "2024-05-03T20:00:00Z",
    description: "Yesterday's dinner beef curry was very salty. Please inform the cook.",
  },
];

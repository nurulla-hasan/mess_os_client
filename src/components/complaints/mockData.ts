import { Complaint } from "./columns";

export const mockComplaints: Complaint[] = [
  {
    id: "c1",
    title: "Internet not working in Room 302",
    member: { name: "Rahim Uddin", email: "rahim@example.com" },
    status: "open",
    createdAt: "2024-05-06T10:00:00Z",
    description: "The wifi router in our corridor seems to be down since this morning. Please check the connection.",
  },
  {
    id: "c2",
    title: "Bathroom tap leaking",
    member: { name: "Tanvir Hasan", email: "tanvir@example.com" },
    status: "in_progress",
    createdAt: "2024-05-05T14:00:00Z",
    description: "Common bathroom 2nd floor tap is leaking. Plumber needs to be called.",
  },
  {
    id: "c3",
    title: "Meal quality feedback - Salt was too high",
    member: { name: "Karim Ahmed", email: "karim@example.com" },
    status: "resolved",
    createdAt: "2024-05-03T20:00:00Z",
    description: "Yesterday's dinner beef curry was very salty. Please inform the cook.",
  },
];

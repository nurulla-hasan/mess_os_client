import { AdminUser } from "./columns";

export const mockAdminUsers: AdminUser[] = [
  {
    id: "au1",
    name: "Golap Hasan",
    email: "golap@example.com",
    globalRole: "super_admin",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "au2",
    name: "Rahim Uddin",
    email: "rahim@example.com",
    globalRole: "user",
    status: "active",
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    id: "au3",
    name: "Bad Actor",
    email: "spam@example.com",
    globalRole: "user",
    status: "blocked",
    createdAt: "2024-03-10T14:30:00Z",
  },
  {
    id: "au4",
    name: "Nasir Uddin",
    email: "nasir@example.com",
    globalRole: "user",
    status: "pending",
    createdAt: "2024-05-06T09:00:00Z",
  },
];

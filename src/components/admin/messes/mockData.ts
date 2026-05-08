

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockAdminMesses: any[] = [
  {
    id: "am1",
    name: "Green House Mess",
    address: "Sector 10, Uttara, Dhaka",
    status: "active",
    createdAt: "2024-01-10T00:00:00Z",
    memberCount: 12,
    manager: { name: "Golap Hasan", email: "golap@example.com" },
  },
  {
    id: "am2",
    name: "Sky View Mess",
    address: "Mirpur 2, Dhaka",
    status: "active",
    createdAt: "2024-03-05T00:00:00Z",
    memberCount: 15,
    manager: { name: "Ariful Islam", email: "arif@example.com" },
  },
  {
    id: "am3",
    name: "Suspended Mess",
    address: "Badda, Dhaka",
    status: "suspended",
    createdAt: "2024-02-20T00:00:00Z",
    memberCount: 8,
    manager: { name: "Bad Manager", email: "bad@example.com" },
  },
];

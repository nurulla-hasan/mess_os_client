import { z } from "zod";

export const createMemberSchema = z.object({
  fullname: z.string().min(2, "Fullname must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type CreateMemberInput = z.infer<typeof createMemberSchema>;

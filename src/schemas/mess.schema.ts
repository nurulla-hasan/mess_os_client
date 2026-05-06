import { z } from "zod";

export const joinMessSchema = z.object({
  inviteCode: z.string().min(4, "Invite code must be at least 4 characters"),
});

export const createMessSchema = z.object({
  name: z.string().min(3, "Mess name must be at least 3 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mealCategories: z
    .array(z.object({ value: z.string().min(1, "Required") }))
    .min(1, "At least one meal category is required"),
  equalShareCategories: z
    .array(z.object({ value: z.string().min(1, "Required") }))
    .min(1, "At least one equal share category is required"),
});

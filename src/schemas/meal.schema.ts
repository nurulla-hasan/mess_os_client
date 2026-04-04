import { z } from "zod";

export const createMealSchema = z.object({
  date: z.string().min(1, "Date is required"),
  entries: z.array(
    z.object({
      memberId: z.string().min(1, "Member is required"),
      breakfast: z.number().min(0).max(10),
      lunch: z.number().min(0).max(10),
      dinner: z.number().min(0).max(10),
      guest: z.number().min(0).max(20),
    })
  ).min(1, "At least one meal entry is required"),
});

export type CreateMealInput = z.infer<typeof createMealSchema>;

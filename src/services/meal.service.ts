/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/fetcher";
/**
 * Get monthly meal summary
 */
export const getMonthlyMealSummary = async (date: string): Promise<any> => {
  return await serverFetch(`/meals/monthly-summary?date=${date}`, {
    tags: ["meal-summary"],
    revalidate: 3600,
  });
};

/**
 * Create or update a meal entry
 */
export const createOrUpdateMeal = async (mealData: any): Promise<any> => {
  return await serverFetch(`/meals`, {
    method: "POST",
    body: mealData,
    updateTag: "meal-summary", 
  });
};

/**
 * Get meal by date
 */
export const getMealByDate = async (date: string): Promise<any> => {
  return await serverFetch(`/meals/date/${date}`, {
    tags: ["meal-summary"],
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { serverFetch } from "@/lib/fetcher";
/**
 * Get real-time dashboard stats for the authenticated user
 */
export const getDashboardStats = async (): Promise<any> => {
  return await serverFetch("/reports/dashboard", {
    tags: ["dashboard-stats"],
    revalidate: 3600,
  });
};


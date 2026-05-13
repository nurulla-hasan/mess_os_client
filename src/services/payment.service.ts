"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { ApiResponse, QueryParams } from "@/types/global.type";
import { IPayment } from "@/types/payment.type";

/**
 * List all payments in a mess (Member+)
 * GET /api/v1/messes/:messId/payments
 */
export const getPayments = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IPayment[]>> => {
  try {
    const queryString = buildQueryString(params);
    const endpoint = `/messes/${messId}/payments${queryString}`;

    return (await serverFetch(endpoint, {
      method: "GET",
      tags: ["payments"],
    })) as ApiResponse<IPayment[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch payments",
      data: [],
    };
  }
};

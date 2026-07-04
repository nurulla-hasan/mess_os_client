"use server";

import { serverFetch } from "@/lib/fetcher";
import { buildQueryString } from "@/lib/buildQueryString";
import { ApiResponse, QueryParams } from "@/types/global.type";
import { CreatePaymentPayload, IPayment, PaymentStatus } from "@/types/payment.type";

export const getPayments = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IPayment[]>> => {
  try {
    const queryString = buildQueryString(params);
    return (await serverFetch(`/messes/${messId}/payments${queryString}`, {
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

export const getMyPayments = async (
  messId: string,
  params: QueryParams = {}
): Promise<ApiResponse<IPayment[]>> => {
  try {
    const queryString = buildQueryString({ ...params, scope: "my" });
    return (await serverFetch(`/messes/${messId}/payments${queryString}`, {
      method: "GET",
      tags: ["payments"],
    })) as ApiResponse<IPayment[]>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch your payments",
      data: [],
    };
  }
};

export const getPaymentById = async (
  messId: string,
  paymentId: string
): Promise<ApiResponse<IPayment>> => {
  try {
    return (await serverFetch(`/messes/${messId}/payments/${paymentId}`, {
      method: "GET",
      tags: ["payments"],
    })) as ApiResponse<IPayment>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to fetch payment",
      data: null as unknown as IPayment,
    };
  }
};

export const createPayment = async (
  messId: string,
  data: CreatePaymentPayload
): Promise<ApiResponse<IPayment>> => {
  try {
    return (await serverFetch(`/messes/${messId}/payments`, {
      method: "POST",
      body: data,
      updateTag: ["payments", "dashboard-stats", "member-bills", "reports", "summary"],
    })) as ApiResponse<IPayment>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to create payment",
      data: null as unknown as IPayment,
    };
  }
};

export const updatePaymentStatus = async (
  messId: string,
  paymentId: string,
  status: Extract<PaymentStatus, "approved" | "rejected" | "canceled">
): Promise<ApiResponse<IPayment>> => {
  try {
    return (await serverFetch(`/messes/${messId}/payments/${paymentId}/status`, {
      method: "PATCH",
      body: { status },
      updateTag: ["payments", "dashboard-stats", "member-bills", "reports", "summary", "mess-members"],
    })) as ApiResponse<IPayment>;
  } catch (error: unknown) {
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update payment",
      data: null as unknown as IPayment,
    };
  }
};

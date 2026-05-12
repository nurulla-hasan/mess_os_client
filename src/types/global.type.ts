export type QueryParams = { [key: string]: string | string[] | undefined };
export type SearchParams = Promise<QueryParams>;

/**
 * Generic API response wrapper matching the backend's standard response shape.
 * Use this as the return type for all service functions instead of `any`.
 */
export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

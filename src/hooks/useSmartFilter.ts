"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useEffect } from "react";

// ============================================
// Type Definitions
// ============================================

export interface SmartFilterOptions {
  /** Debounce delay in milliseconds */
  debounce?: number;
  /** Reset pagination to page 1 when filter changes */
  resetPage?: boolean;
  /** Enable scroll restoration after navigation */
  scroll?: boolean;
  /** Navigation method - push adds to history, replace does not */
  method?: "push" | "replace";
}

export interface SmartFilterConfig {
  /** URL parameter key for pagination (default: "page") */
  paginationKey?: string;
  /** Default debounce delay for all updates (default: 0) */
  defaultDebounce?: number;
}

export interface ClearAllOptions {
  /** Keys to exclude from clearing */
  exclude?: ReadonlyArray<string>;
  /** Enable scroll restoration */
  scroll?: boolean;
  /** Navigation method */
  method?: "push" | "replace";
}

// ============================================
// Main Hook
// ============================================

/**
 * A powerful hook for managing URL search parameters in Next.js App Router.
 * 
 * Features:
 * - Debouncing for search/filter inputs
 * - Batch updates for multiple filters at once
 * - Toggle support for multi-select filters
 * - Automatic pagination reset on filter change
 * - Type-safe parameter keys
 * - Memory leak prevention
 * 
 * @example
 * ```tsx
 * const { updateFilter, getFilter, clearAll } = useSmartFilter<"search" | "status">();
 * 
 * // Debounced search
 * <input 
 *   value={getFilter("search")} 
 *   onChange={(e) => updateFilter("search", e.target.value, { debounce: 300 })}
 * />
 * 
 * // Status filter
 * <select 
 *   value={getFilter("status")} 
 *   onChange={(e) => updateFilter("status", e.target.value)}
 * />
 * 
 * // Clear all filters
 * <button onClick={() => clearAll()}>Reset</button>
 * ```
 */
export const useSmartFilter = <T extends string = string>(
  config: SmartFilterConfig = {}
) => {
  const { paginationKey = "page", defaultDebounce = 0 } = config;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutRefs = useRef<Record<string, NodeJS.Timeout>>({});

  // ============================================
  // Cleanup on unmount
  // ============================================
  useEffect(() => {
    return () => {
      // Clear all pending timeouts to prevent memory leaks
      Object.values(timeoutRefs.current).forEach(clearTimeout);
      timeoutRefs.current = {};
    };
  }, []);

  // ============================================
  // Update Single Filter
  // ============================================
  const updateFilter = useCallback(
    (
      key: T,
      value: string | number | null | undefined,
      options: SmartFilterOptions | number = {}
    ) => {
      // Handle legacy debounceTime as 3rd argument (backward compatibility)
      const opt = typeof options === "number" ? { debounce: options } : options;
      const {
        debounce = defaultDebounce,
        resetPage = true,
        scroll = false,
        method = "push",
      } = opt;

      // Clear existing timeout for this key
      if (timeoutRefs.current[key]) {
        clearTimeout(timeoutRefs.current[key]);
        delete timeoutRefs.current[key];
      }

      const executeUpdate = () => {
        const params = new URLSearchParams(searchParams.toString());

        // Set or delete parameter
        if (value !== null && value !== undefined && value !== "") {
          // Validate page number if updating pagination
          if (key === paginationKey) {
            const pageNum = Number(value);
            if (isNaN(pageNum) || pageNum < 1) {
              console.warn(`[useSmartFilter] Invalid page number: ${value}`);
              return;
            }
          }
          params.set(key, String(value));
        } else {
          params.delete(key);
        }

        // Reset pagination when other filters change
        if (resetPage && key !== paginationKey) {
          params.set(paginationKey, "1");
        }

        // Navigate
        const url = `${pathname}?${params.toString()}`;
        if (method === "replace") {
          router.replace(url, { scroll });
        } else {
          router.push(url, { scroll });
        }
      };

      // Execute with or without debounce
      if (debounce > 0) {
        timeoutRefs.current[key] = setTimeout(executeUpdate, debounce);
      } else {
        executeUpdate();
      }
    },
    [searchParams, pathname, router, paginationKey, defaultDebounce]
  );

  // ============================================
  // Update Multiple Filters (Batch)
  // ============================================
  const updateBatch = useCallback(
    (
      updates: Partial<Record<T, string | number | null | undefined>>,
      options: SmartFilterOptions | number = {}
    ) => {
      // Handle legacy debounceTime as 2nd argument
      const opt = typeof options === "number" ? { debounce: options } : options;
      const {
        debounce = defaultDebounce,
        resetPage = true,
        scroll = false,
        method = "push",
      } = opt;

      const keys = Object.keys(updates) as T[];

      // Clear existing timeouts for all updated keys
      keys.forEach((key) => {
        if (timeoutRefs.current[key]) {
          clearTimeout(timeoutRefs.current[key]);
          delete timeoutRefs.current[key];
        }
      });

      const executeUpdate = () => {
        const params = new URLSearchParams(searchParams.toString());
        let hasFilterChanged = false;

        // Apply all updates
        Object.entries(updates).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            // Validate page number
            if (key === paginationKey) {
              const pageNum = Number(value);
              if (isNaN(pageNum) || pageNum < 1) {
                console.warn(`[useSmartFilter] Invalid page number: ${value}`);
                return;
              }
            }
            params.set(key, String(value));
          } else {
            params.delete(key);
          }

          if (key !== paginationKey) {
            hasFilterChanged = true;
          }
        });

        // Reset pagination if non-page filters changed
        if (resetPage && hasFilterChanged) {
          params.set(paginationKey, "1");
        }

        // Navigate
        const url = `${pathname}?${params.toString()}`;
        if (method === "replace") {
          router.replace(url, { scroll });
        } else {
          router.push(url, { scroll });
        }
      };

      // Execute with or without debounce
      if (debounce > 0) {
        // Use unique key for batch operation to avoid conflicts
        const batchKey = `__batch_${Math.random()}` as T;
        timeoutRefs.current[batchKey] = setTimeout(() => {
          executeUpdate();
          delete timeoutRefs.current[batchKey];
        }, debounce);
      } else {
        executeUpdate();
      }
    },
    [searchParams, pathname, router, paginationKey, defaultDebounce]
  );

  // ============================================
  // Toggle Filter (Multi-Select)
  // ============================================
  const toggleFilter = useCallback(
    (key: T, value: string, options?: SmartFilterOptions) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentVal = params.get(key);
      let newValues = currentVal ? currentVal.split(",") : [];

      if (newValues.includes(value)) {
        newValues = newValues.filter((v) => v !== value);
      } else {
        newValues.push(value);
      }

      const finalValue = newValues.length > 0 ? newValues.join(",") : null;
      updateFilter(key, finalValue, options);
    },
    [searchParams, updateFilter]
  );

  // ============================================
  // Clear All Filters
  // ============================================
  const clearAll = useCallback(
    (options: ClearAllOptions = {}) => {
      const { exclude = [], scroll = false, method = "push" } = options;
      const params = new URLSearchParams(searchParams.toString());

      // Clear all timeouts
      Object.values(timeoutRefs.current).forEach(clearTimeout);
      timeoutRefs.current = {};

      // Delete all params except excluded ones
      Array.from(params.keys()).forEach((key) => {
        if (!exclude.includes(key)) {
          params.delete(key);
        }
      });

      // Navigate
      const url = `${pathname}?${params.toString()}`;
      if (method === "replace") {
        router.replace(url, { scroll });
      } else {
        router.push(url, { scroll });
      }
    },
    [searchParams, pathname, router]
  );

  // ============================================
  // Get Filter Value
  // ============================================
  const getFilter = useCallback(
    (key: T, defaultValue = "") => {
      return searchParams.get(key) ?? defaultValue;
    },
    [searchParams]
  );

  // ============================================
  // Get Array Filter (Comma-Separated)
  // ============================================
  const getArrayFilter = useCallback(
    (key: T) => {
      const val = searchParams.get(key);
      return val ? val.split(",").filter(Boolean) : [];
    },
    [searchParams]
  );

  // ============================================
  // Check if Value is Selected (Multi-Select)
  // ============================================
  const isSelected = useCallback(
    (key: T, value: string) => {
      const val = searchParams.get(key);
      return val ? val.split(",").includes(value) : false;
    },
    [searchParams]
  );

  // ============================================
  // Check if Any Filter is Active
  // ============================================
  /**
   * Check if any filters are active
   * @param keys - Specific keys to check. If not provided, checks all keys except pagination
   */
  const isFilterActive = useCallback(
    (keys?: ReadonlyArray<T>) => {
      if (keys && keys.length > 0) {
        return keys.some((key) => searchParams.has(key));
      }

      // Check all params except pagination
      const allKeys = Array.from(searchParams.keys());
      return allKeys.some((key) => key !== paginationKey);
    },
    [searchParams, paginationKey]
  );

  // ============================================
  // Get Active Filter Count
  // ============================================
  /**
   * Count active filters
   * @param keys - Specific keys to count. If not provided, counts all keys except pagination
   */
  const getActiveCount = useCallback(
    (keys?: ReadonlyArray<T>) => {
      if (keys && keys.length > 0) {
        return keys.filter((key) => searchParams.has(key)).length;
      }

      // Count all params except pagination
      const allKeys = Array.from(searchParams.keys());
      return allKeys.filter((key) => key !== paginationKey).length;
    },
    [searchParams, paginationKey]
  );

  // ============================================
  // Get All Filters as Object
  // ============================================
  /**
   * Get all search params as an object
   */
  const getAllFilters = useCallback(() => {
    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      filters[key] = value;
    });
    return filters;
  }, [searchParams]);

  return {
    // Update methods
    updateFilter,
    updateBatch,
    toggleFilter,
    clearAll,

    // Read methods
    getFilter,
    getArrayFilter,
    isSelected,
    getAllFilters,

    // Status methods
    isFilterActive,
    getActiveCount,
  };
};
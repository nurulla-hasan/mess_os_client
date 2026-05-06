"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ============================================
// Type Definitions
// ============================================

type FilterValue = string | number | null | undefined;
type NavigationMethod = "push" | "replace";

export interface SmartFilterOptions {
  /** Debounce delay in milliseconds */
  debounce?: number;

  /** Reset pagination to page 1 when filter changes */
  resetPage?: boolean;

  /** Enable scroll restoration after navigation */
  scroll?: boolean;

  /** Navigation method - push adds to history, replace does not */
  method?: NavigationMethod;
}

export interface SmartFilterConfig {
  /** URL parameter key for pagination */
  paginationKey?: string;

  /** Default debounce delay for all updates */
  defaultDebounce?: number;

  /** Default navigation method */
  defaultMethod?: NavigationMethod;
}

export interface ClearAllOptions {
  /** Keys to exclude from clearing */
  exclude?: ReadonlyArray<string>;

  /** Enable scroll restoration */
  scroll?: boolean;

  /** Navigation method */
  method?: NavigationMethod;
}

const BATCH_KEY = "___global_batch_update___";

// ============================================
// Main Hook
// ============================================

/**
 * A powerful hook for managing URL search parameters in Next.js App Router.
 *
 * Features:
 * - Optimistic UI updates
 * - Debounced URL navigation
 * - Batch filter updates
 * - Pagination reset
 * - Multi-select toggle
 * - Clear all filters
 * - Pending update state
 */
export const useSmartFilter = <T extends string = string>(
  config: SmartFilterConfig = {},
) => {
  const {
    paginationKey = "page",
    defaultDebounce = 0,
    defaultMethod = "replace",
  } = config;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const timeoutRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const [optimisticParams, setOptimisticParams] = useState(
    () => new URLSearchParams(searchParams.toString()),
  );

  const latestParamsRef = useRef(new URLSearchParams(searchParams.toString()));

  const [pendingKeys, setPendingKeys] = useState<string[]>([]);

  // ============================================
  // Helpers
  // ============================================

  const isEmptyValue = useCallback((value: FilterValue) => {
    return value === null || value === undefined || value === "";
  }, []);

  const isInvalidPagination = useCallback(
    (key: string, value: FilterValue) => {
      if (key !== paginationKey || isEmptyValue(value)) return false;

      const page = Number(value);

      return !Number.isInteger(page) || page < 1;
    },
    [paginationKey, isEmptyValue],
  );

  const buildUrl = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();

      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname],
  );

  const navigateWithParams = useCallback(
    (params: URLSearchParams, method: NavigationMethod, scroll: boolean) => {
      const url = buildUrl(params);

      if (method === "push") {
        router.push(url, { scroll });
      } else {
        router.replace(url, { scroll });
      }
    },
    [router, buildUrl],
  );

  const addPendingKey = useCallback((key: string) => {
    setPendingKeys((prev) => {
      if (prev.includes(key)) return prev;

      return [...prev, key];
    });
  }, []);

  const removePendingKey = useCallback((key: string) => {
    setPendingKeys((prev) => prev.filter((item) => item !== key));
  }, []);

  const clearTimer = useCallback(
    (key: string) => {
      if (timeoutRefs.current[key]) {
        clearTimeout(timeoutRefs.current[key]);
        delete timeoutRefs.current[key];
      }

      removePendingKey(key);
    },
    [removePendingKey],
  );

  /**
   * Only clears timers.
   * Do not call setState here, so it stays safe to use inside effects.
   */
  const clearAllTimers = useCallback(() => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
  }, []);

  const updateOptimisticParams = useCallback(
    (updater: (prev: URLSearchParams) => URLSearchParams) => {
      const next = updater(new URLSearchParams(latestParamsRef.current));

      latestParamsRef.current = new URLSearchParams(next);
      setOptimisticParams(next);
    },
    [],
  );

  const applyUpdatesToParams = useCallback(
    (
      baseParams: URLSearchParams,
      updates: Partial<Record<T, FilterValue>>,
      resetPage: boolean,
    ) => {
      const next = new URLSearchParams(baseParams);
      const entries = Object.entries(updates) as [T, FilterValue][];

      let hasFilterChanged = false;

      entries.forEach(([key, value]) => {
        if (isInvalidPagination(key, value)) return;

        if (isEmptyValue(value)) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }

        if (key !== paginationKey) {
          hasFilterChanged = true;
        }
      });

      if (resetPage && hasFilterChanged) {
        next.set(paginationKey, "1");
      }

      return next;
    },
    [paginationKey, isEmptyValue, isInvalidPagination],
  );

  const scheduleNavigation = useCallback(
    (
      key: string,
      debounce: number,
      method: NavigationMethod,
      scroll: boolean,
    ) => {
      clearTimer(key);

      const executeUpdate = () => {
        const latestParams = new URLSearchParams(latestParamsRef.current);

        navigateWithParams(latestParams, method, scroll);

        delete timeoutRefs.current[key];
        removePendingKey(key);
      };

      if (debounce > 0) {
        addPendingKey(key);
        timeoutRefs.current[key] = setTimeout(executeUpdate, debounce);
      } else {
        executeUpdate();
      }
    },
    [clearTimer, navigateWithParams, addPendingKey, removePendingKey],
  );

  // ============================================
  // Sync With Real URL
  // ============================================

  useEffect(() => {
    const currentParams = searchParams.toString();
    const latestParams = latestParamsRef.current.toString();

    // Back/forward button or external URL change
    if (latestParams === currentParams) return;

    clearAllTimers();

    const next = new URLSearchParams(currentParams);

    latestParamsRef.current = next;

    // URL search params are external state, so this sync is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOptimisticParams(next);
    setPendingKeys([]);
  }, [searchParams, clearAllTimers]);

  // Cleanup pending timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  // ============================================
  // Update Single Filter
  // ============================================

  const updateFilter = useCallback(
    (key: T, value: FilterValue, options: SmartFilterOptions | number = {}) => {
      if (isInvalidPagination(key, value)) return;

      const opt = typeof options === "number" ? { debounce: options } : options;

      const {
        debounce = defaultDebounce,
        resetPage = true,
        scroll = false,
        method = defaultMethod,
      } = opt;

      updateOptimisticParams((prev) =>
        applyUpdatesToParams(
          prev,
          { [key]: value } as Partial<Record<T, FilterValue>>,
          resetPage,
        ),
      );

      scheduleNavigation(key, debounce, method, scroll);
    },
    [
      defaultDebounce,
      defaultMethod,
      isInvalidPagination,
      updateOptimisticParams,
      applyUpdatesToParams,
      scheduleNavigation,
    ],
  );

  // ============================================
  // Update Multiple Filters
  // ============================================

  const updateBatch = useCallback(
    (
      updates: Partial<Record<T, FilterValue>>,
      options: SmartFilterOptions | number = {},
    ) => {
      if (Object.keys(updates).length === 0) return;

      const opt = typeof options === "number" ? { debounce: options } : options;

      const {
        debounce = defaultDebounce,
        resetPage = true,
        scroll = false,
        method = defaultMethod,
      } = opt;

      updateOptimisticParams((prev) =>
        applyUpdatesToParams(prev, updates, resetPage),
      );

      scheduleNavigation(BATCH_KEY, debounce, method, scroll);
    },
    [
      defaultDebounce,
      defaultMethod,
      updateOptimisticParams,
      applyUpdatesToParams,
      scheduleNavigation,
    ],
  );

  // ============================================
  // Toggle Filter - Multi Select
  // ============================================

  const toggleFilter = useCallback(
    (key: T, value: string, options?: SmartFilterOptions) => {
      const currentValue = latestParamsRef.current.get(key);
      let values = currentValue ? currentValue.split(",").filter(Boolean) : [];

      if (values.includes(value)) {
        values = values.filter((item) => item !== value);
      } else {
        values.push(value);
      }

      const finalValue = values.length > 0 ? values.join(",") : null;

      updateFilter(key, finalValue, options);
    },
    [updateFilter],
  );

  // ============================================
  // Clear All Filters
  // ============================================

  const clearAll = useCallback(
    (options: ClearAllOptions = {}) => {
      const { exclude = [], scroll = false, method = defaultMethod } = options;

      clearAllTimers();
      setPendingKeys([]);

      updateOptimisticParams((prev) => {
        const next = new URLSearchParams(prev);

        Array.from(next.keys()).forEach((key) => {
          if (!exclude.includes(key)) {
            next.delete(key);
          }
        });

        return next;
      });

      navigateWithParams(
        new URLSearchParams(latestParamsRef.current),
        method,
        scroll,
      );
    },
    [defaultMethod, clearAllTimers, updateOptimisticParams, navigateWithParams],
  );

  // ============================================
  // Read Methods
  // ============================================

  const getFilter = useCallback(
    (key: T, defaultValue = "") => {
      return optimisticParams.get(key) ?? defaultValue;
    },
    [optimisticParams],
  );

  const getArrayFilter = useCallback(
    (key: T) => {
      const value = optimisticParams.get(key);

      return value ? value.split(",").filter(Boolean) : [];
    },
    [optimisticParams],
  );

  const isSelected = useCallback(
    (key: T, value: string) => {
      const currentValue = optimisticParams.get(key);

      return currentValue ? currentValue.split(",").includes(value) : false;
    },
    [optimisticParams],
  );

  const isFilterActive = useCallback(
    (keys?: ReadonlyArray<T>) => {
      if (keys && keys.length > 0) {
        return keys.some((key) => optimisticParams.has(key));
      }

      return Array.from(optimisticParams.keys()).some(
        (key) => key !== paginationKey,
      );
    },
    [optimisticParams, paginationKey],
  );

  const getAllFilters = useCallback(() => {
    return Object.fromEntries(optimisticParams.entries()) as Partial<
      Record<T, string>
    >;
  }, [optimisticParams]);

  const getActiveCount = useCallback(
    (keys?: ReadonlyArray<T>) => {
      const activeKeys =
        keys ??
        (Array.from(optimisticParams.keys()).filter(
          (key) => key !== paginationKey,
        ) as T[]);

      return activeKeys.filter((key) => optimisticParams.has(key)).length;
    },
    [optimisticParams, paginationKey],
  );

  const params = useMemo(
    () => new URLSearchParams(optimisticParams),
    [optimisticParams],
  );

  const visiblePendingKeys = useMemo(
    () => pendingKeys.filter((key) => key !== BATCH_KEY) as T[],
    [pendingKeys],
  );

  const isPendingKey = useCallback(
    (key: T) => pendingKeys.includes(key),
    [pendingKeys],
  );

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

    // Advanced state
    params,
    paramsString: optimisticParams.toString(),

    // Pending state
    isPending: pendingKeys.length > 0,
    pendingKeys: visiblePendingKeys,
    isPendingKey,
  };
};

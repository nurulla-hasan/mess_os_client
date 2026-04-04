"use client";
import { useCallback, useRef } from "react";
import { useState } from "react";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseInfiniteQueryProps<T> {
  initialData: T[];
  initialMeta?: {
    totalPages: number;
    page: number;
  };
  fetchAction: (page: number) => Promise<PaginatedResponse<T>>; // Updated to support meta
  initialPage?: number;
}

export function useInfiniteQuery<T>({ 
  initialData, 
  initialMeta,
  fetchAction, 
  initialPage = 1,
}: UseInfiniteQueryProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  
  // Initialize hasMore based on initialMeta if provided, else default to true
  const [hasMore, setHasMore] = useState(() => {
    if (initialMeta) {
      return initialMeta.page < initialMeta.totalPages;
    }
    return true;
  });

  // Logic to load more data (Memoized)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetchAction(nextPage);

      if (response.data && response.data.length > 0) {
        setData((prev) => [...prev, ...response.data]);
        setPage(nextPage);
        
        // Use totalPages from server meta to decide if there's more data
        if (nextPage >= response.meta.totalPages) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more data", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, fetchAction]);

  // Use scroll hook (Intersection Observer)
  const lastElementRef = useInfiniteScroll(loading, hasMore, loadMore);

  return { data, loading, hasMore, lastElementRef };
}


function useInfiniteScroll(isLoading: boolean, hasMore: boolean, onLoadMore: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore]
  );
  return lastElementRef;
}
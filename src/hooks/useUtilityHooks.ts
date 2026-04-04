"use client";

import { useState, useEffect } from "react";

/**
 * Hook to copy text to clipboard
 */
export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setIsCopied(false);
      return false;
    }
  };

  return { isCopied, copyToClipboard };
}

/**
 * Hook for a persistent countdown timer
 */
export function useCountdown(initialSeconds: number, storageKey: string = "otp-timer") {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    if (typeof window === "undefined") return initialSeconds;
    const savedTargetTime = localStorage.getItem(storageKey);
    if (!savedTargetTime) return initialSeconds;

    const targetTime = parseInt(savedTargetTime, 10);
    const now = Date.now();
    const diff = Math.ceil((targetTime - now) / 1000);

    if (diff > 0) {
      return diff;
    }

    localStorage.removeItem(storageKey);
    return 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTargetTime = localStorage.getItem(storageKey);
    if (!savedTargetTime) return false;

    const targetTime = parseInt(savedTargetTime, 10);
    const now = Date.now();
    const diff = Math.ceil((targetTime - now) / 1000);
    return diff > 0;
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (isRunning) {
      timerId = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            localStorage.removeItem(storageKey);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, storageKey]); // depends on isRunning and storageKey, but not secondsLeft

  const start = () => {
    const targetTime = Date.now() + initialSeconds * 1000;
    localStorage.setItem(storageKey, targetTime.toString());
    
    setSecondsLeft(initialSeconds);
    setIsRunning(true);
  };

  const reset = () => {
    localStorage.removeItem(storageKey);
    setIsRunning(false);
    setSecondsLeft(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return { 
    secondsLeft: formatTime(), 
    isRunning, 
    start, 
    reset 
  };
}

/**
 * Hook for interacting with localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Hook for media queries
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Hook for network status
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof window === "undefined") return true;
    return navigator.onLine;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Run once on mount

  return isOnline;
}
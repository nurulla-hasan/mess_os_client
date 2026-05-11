"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/use-auth-store";
import { IUser, IMembership } from "@/types/user.type";

interface AuthStoreInitializerProps {
  user: IUser | null;
  myMembership: IMembership | null;
}

export function AuthStoreInitializer({ user, myMembership }: AuthStoreInitializerProps) {
  const initialized = useRef(false);

  // Safe initialization using useEffect
  useEffect(() => {
    if (!initialized.current) {
      useAuthStore.getState().setAuth(user, myMembership);
      initialized.current = true;
    }
  }, [user, myMembership]);

  return null;
}

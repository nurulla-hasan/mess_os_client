"use client";

import { useEffect, useRef } from "react";
import { IMember } from "@/types/member.type";
import { useMemberStore } from "@/store/use-member-store";

export function MemberStoreInitializer({ members }: { members: IMember[] }) {
  const isInitialized = useRef(false);

  // Sync server data to global store on first render
  if (!isInitialized.current) {
    useMemberStore.getState().setMembers(members);
    isInitialized.current = true;
  }

  // Also update if members change (e.g. on soft refresh/navigation)
  useEffect(() => {
    useMemberStore.getState().setMembers(members);
  }, [members]);

  return null;
}

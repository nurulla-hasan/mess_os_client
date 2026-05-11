"use client";

import { useEffect, useRef } from "react";
import { useMemberStore } from "@/store/use-member-store";
import { IMember } from "@/types/member.type";

interface MemberStoreInitializerProps {
  members: IMember[];
}

export function MemberStoreInitializer({ members }: MemberStoreInitializerProps) {
  const initialized = useRef(false);

  // Use useEffect to update the store safely after the initial render
  useEffect(() => {
    if (!initialized.current) {
      useMemberStore.getState().setMembers(members);
      initialized.current = true;
    }
  }, [members]);

  return null;
}

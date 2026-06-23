"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/members/columns";
import { IMember } from "@/types/member.type";
import { IUser, IMembership } from "@/types/user.type";
import { IMess } from "@/types/mess.type";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

interface ManagerMembersClientProps {
  data: IMember[];
  meta?: PaginationMeta;
}

export default function ManagerMembersClient({
  data,
  meta,
}: ManagerMembersClientProps) {
  const [currentMemberId, setCurrentMemberId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
        const res = await fetch(`${baseUrl}/users/me`, {
          credentials: "include",
        });
        const result = await res.json();
        const user = result?.data as IUser | undefined;
        if (user?.memberships?.length) {
          // Extract activeMessId from the first member's data
          const activeMessId = (data?.[0] as IMember & { messId: string })?.messId;
          if (activeMessId) {
            const membership = (user.memberships as IMembership[]).find(
              (m) =>
                (typeof m.messId === "string" ? m.messId : (m.messId as IMess)?._id) ===
                activeMessId
            );
            if (membership?._id) {
              setCurrentMemberId(membership._id);
            }
          }
        }
      } catch {
        // Silently fail — columns will work without currentMemberId
      }
    };
    fetchCurrentUser();
  }, [data]);

  return (
    <DataTable
      columns={columns(currentMemberId)}
      data={data || []}
      meta={meta}
    />
  );
}

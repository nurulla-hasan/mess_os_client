"use client";

import React from "react";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/members/columns";
import { IMember } from "@/types/member.type";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

interface ManagerMembersClientProps {
  data: IMember[];
  meta?: PaginationMeta;
  currentMemberId?: string;
}

export default function ManagerMembersClient({
  data,
  meta,
  currentMemberId,
}: ManagerMembersClientProps) {
  return (
    <DataTable
      columns={columns(currentMemberId)}
      data={data || []}
      meta={meta}
    />
  );
}

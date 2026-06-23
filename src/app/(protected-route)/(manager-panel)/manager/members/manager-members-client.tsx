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
}

export default function ManagerMembersClient({
  data,
  meta,
}: ManagerMembersClientProps) {
  return (
    <DataTable
      columns={columns()}
      data={data || []}
      meta={meta}
    />
  );
}

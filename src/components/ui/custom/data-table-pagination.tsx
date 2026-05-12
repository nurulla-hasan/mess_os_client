"use client";

import { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";
import CustomPagination from "./custom-pagination";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  meta?: PaginationMeta;
}

export function DataTablePagination<TData>({
  table,
  meta,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      <div className="text-muted-foreground text-sm text-center sm:text-left">
        {meta ? (
          <>
            Showing {(meta.page - 1) * meta.limit + 1} to{" "}
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}{" "}
            entries
          </>
        ) : (
          <>
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )} of {table.getFilteredRowModel().rows.length}{" "}
            entries
          </>
        )}
      </div>
      <div className="flex items-center">
        {meta ? (
          <CustomPagination
            currentPage={meta.page}
            totalPages={meta.totalPages ?? Math.ceil(meta.total / meta.limit)}
          />
        ) : (
          <Pagination>
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();
                    table.previousPage();
                  }}
                  className={cn(
                    "h-8 w-8 sm:w-auto p-0 sm:px-3 cursor-pointer",
                    !table.getCanPreviousPage() &&
                      "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>

              {(() => {
                const page = table.getState().pagination.pageIndex + 1;
                const totalPages = table.getPageCount();
                const pages: (number | string)[] = [];

                if (totalPages <= 5) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  pages.push(1);
                  if (page > 3) pages.push("...");
                  for (
                    let i = Math.max(2, page - 1);
                    i <= Math.min(totalPages - 1, page + 1);
                    i++
                  ) {
                    pages.push(i);
                  }
                  if (page < totalPages - 2) pages.push("...");
                  pages.push(totalPages);
                }

                return pages.map((pageNumItem, idx) => {
                  if (pageNumItem === "...") {
                    return (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis className="h-8 w-8" />
                      </PaginationItem>
                    );
                  }

                  const pageNum = pageNumItem as number;
                  const isActive = pageNum === page;

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        onClick={(e: { preventDefault: () => void }) => {
                          e.preventDefault();
                          table.setPageIndex(pageNum - 1);
                        }}
                        isActive={isActive}
                        className="h-8 w-8 p-0 cursor-pointer text-xs"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                });
              })()}

              <PaginationItem>
                <PaginationNext
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();
                    table.nextPage();
                  }}
                  className={cn(
                    "h-8 w-8 sm:w-auto p-0 sm:px-3 cursor-pointer",
                    !table.getCanNextPage() && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

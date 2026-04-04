"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { cn } from "@/lib/utils";
import { useSmartFilter } from "@/hooks/useSmartFilter";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    headerClassName?: string;
  }
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  limit?: number;
  meta?: PaginationMeta;
  searchKey?: string;
  showFooter?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  limit = 10,
  meta,
  searchKey,
  showFooter = false,
}: DataTableProps<TData, TValue>) {
  const { updateFilter, getFilter } = useSmartFilter({ defaultDebounce: 300 });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: meta ? meta.page - 1 : 0,
    pageSize: limit,
  });

  // Local state for search to ensure smooth typing UX
  const [searchValue, setSearchValue] = React.useState(
    searchKey ? getFilter(searchKey) : ""
  );

  // Sync local search value with URL (for back/forward navigation)
  React.useEffect(() => {
    if (searchKey) {
      setSearchValue(getFilter(searchKey));
    }
  }, [getFilter, searchKey]);

  // Update pagination state when limit or meta changes
  React.useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: limit,
      ...(meta && { pageIndex: meta.page - 1 }),
    }));
  }, [limit, meta]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    pageCount: meta
      ? (meta.totalPages ?? Math.ceil(meta.total / meta.limit))
      : undefined,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: (updater) => {
      const nextState = typeof updater === "function" ? updater(pagination) : updater;
      setPagination(nextState);
      
      updateFilter("page", nextState.pageIndex + 1);
    },
    manualPagination: true,
    manualFiltering: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex w-full items-center">
          <div className="flex items-center relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder={`Search...`}
              value={searchValue}
              onChange={(event) => {
                const value = event.target.value;
                setSearchValue(value);
                updateFilter(searchKey, value);
              }}
              className="pl-10 md:max-w-68 w-full"
            />
          </div>
        </div>
      )}
      <ScrollArea className="max-w-[calc(100vw-40px)] lg:max-w-[calc(100vw-296px)] xl:w-full rounded-lg border whitespace-nowrap">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "h-12 px-4 bg-accent",
                        header.column.columnDef.meta?.headerClassName
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center gap-1 cursor-pointer select-none hover:text-foreground"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <span className="ml-1">
                              {header.column.getIsSorted() === "asc" && (
                                <ArrowUp className="h-3 w-3" />
                              )}
                              {header.column.getIsSorted() === "desc" && (
                                <ArrowDown className="h-3 w-3" />
                              )}
                              {!header.column.getIsSorted() && (
                                <ArrowUpDown className="h-3 w-3 opacity-50" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="h-12 pl-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {showFooter && (
            <TableFooter className="border-t">
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id} className="p-2">
                      {footer.isPlaceholder
                        ? null
                        : flexRender(
                          footer.column.columnDef.footer,
                          footer.getContext()
                        )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          )}
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <React.Suspense fallback={null}>
        {(meta || table.getPageCount() > 1) && (
          <DataTablePagination table={table} meta={meta} />
        )}
      </React.Suspense>
    </div>
  );
}

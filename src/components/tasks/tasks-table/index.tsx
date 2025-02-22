'use client';

import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { PaginationWithLinks } from '@/components/common/pagination';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAllUsers } from '@/hooks/user/get-all';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { z } from 'zod';

import UsersFilter from './filter';
import usersColumns from './table/columns';

export function UsersTable() {
  const searchParams = useSearchParams();
  const page = z.number().parse(Number(searchParams.get('page') ?? '1'));
  const limit = z.number().parse(Number(searchParams.get('limit') ?? '10'));
  const search = z.string().parse(searchParams.get('search') ?? '');
  const status = z.string().parse(searchParams.get('status') ?? '');
  const order_by = z.string().parse(searchParams.get('order_by') ?? '');
  const order = z.string().parse(searchParams.get('order') ?? '');

  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useGetAllUsers(page, limit, search, status, order_by, order);
  console.log(users);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const tableData = React.useMemo(() => users?.data?.data ?? [], [users]);

  const table = useReactTable({
    data: tableData,
    columns: usersColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const pageSizeOptions = [8, 12, 16, 20];
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <UsersFilter />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading && (
              <>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {usersColumns.map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}

            {!isLoading && isError && (
              <TableRow>
                <TableCell
                  colSpan={usersColumns.length}
                  className="h-24 text-center"
                >
                  {error.message}
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && table.getRowModel().rows.length > 0 && (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}

            {!isLoading &&
              !isError &&
              table.getRowModel().rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={usersColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      <div className="space-x-2 py-4">
        {users && users.data && (
          <PaginationWithLinks
            page={Number(users.data.meta.page)}
            totalCount={users.data.meta.item_count}
            pageSize={Number(limit)}
            pageSizeSelectOptions={{
              pageSizeOptions,
              pageSizeSearchParam: 'limit',
            }}
          />
        )}
      </div>
    </div>
  );
}

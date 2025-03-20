import Link from 'next/link';
import React from 'react';

import OrderButton from '@/components/order-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import dateConverter from '@/utils/Conversions/dateConverter';

const usersColumns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return (
        <div className="capitalize flex items-center gap-1">
          {isActive && (
            <>
              <div className="size-2 rounded-full bg-green-500" />
              <span>Ativo</span>
            </>
          )}
          {!isActive && (
            <>
              <div className="size-2 rounded-full bg-red-500" />
              <span>Desativado</span>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: () => {
      return <OrderButton column="name" />;
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const image = row.original.image;
      return (
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p>{name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'created_at',
    header: () => <div className="text-right">Entrou em</div>,
    cell: ({ row }) => {
      const createdAt = row.original.created_at;

      return (
        <div className="text-right font-medium">
          {dateConverter({ date: createdAt, type: 'date' })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/users/${row.original.email}`}>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default usersColumns;

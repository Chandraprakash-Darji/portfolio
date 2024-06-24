'use client';

import { TGetAllComments } from '@/lib/query/writing/get-comments';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';

import { ColumnHeader } from '../../table/column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const commentColumns: ColumnDef<TGetAllComments[number]>[] = [
  {
    accessorKey: 'email',
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original?.user
              ? row.original.user?.name
              : row.original.email || 'Anonymous'}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'content',
    header: ({ column }) => <ColumnHeader column={column} title="content" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <div className="line-clamp-2 max-w-[500px] justify-start truncate font-medium">
            {row.original.content}
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'isApproved',
    header: ({ column }) => <ColumnHeader column={column} title="Approved" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original.isApproved ? <Check /> : <X />}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'likes',
    header: ({ column }) => <ColumnHeader column={column} title="Likes" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original.likes}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'replies',
    header: ({ column }) => <ColumnHeader column={column} title="Replies" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original._count.replies}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: 'created_at',
    header: ({ column }) => <ColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = format(new Date(row.original.createdAt), 'MM/dd/yyyy');

      if (!date) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <ColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <DataTableRowActions row={row.original} />,
    enableHiding: false,
    enableSorting: false,
  },
];

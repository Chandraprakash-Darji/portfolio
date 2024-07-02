'use client';

import { TGetPosts } from '@/lib/query/writing/get-posts';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { ColumnHeader } from '../../../table/column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { postTypes, statuses } from './data/data';

export const postColumns: ColumnDef<TGetPosts[number]>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.title}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'category_id',
    header: ({ column }) => <ColumnHeader column={column} title="Category" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <div className="max-w-[500px] justify-start truncate font-medium">
            {row.original.categories.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center rounded-full border border-gray-400 px-3 py-1 text-sm text-gray-500"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'post_type',
    header: ({ column }) => <ColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const postType = postTypes.find(
        (status) => status.value === row.original.type
      );

      if (!postType) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          <postType.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{postType.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find(
        (status) =>
          status.value === (row.original.published ? 'published' : 'draft')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'comments',
    header: ({ column }) => <ColumnHeader column={column} title="Comments" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original._count.comments}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'views',
    header: ({ column }) => <ColumnHeader column={column} title="Views" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.original.views}</span>
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
    cell: ({ row }) => (
      <DataTableRowActions
        id={row.original.id}
        slug={row.original.slug}
        type={row.original.type}
      />
    ),
    enableHiding: false,
    enableSorting: false,
  },
];

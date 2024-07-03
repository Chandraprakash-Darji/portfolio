'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { deletePost } from '@/actions/writing/delete-post';
import { UnstyledLink } from '@/components/links';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { protectedPostConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import {
  MoreVertical,
  Loader2 as SpinnerIcon,
  Trash as TrashIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { PostType } from '@/lib/enums';

interface DataTableRowActionsProps {
  id: string;
  slug: string;
  type: PostType;
}

export function DataTableRowActions({
  slug,
  id,
  type,
}: DataTableRowActionsProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const { isLoading, execute } = useAction(deletePost, {
    onSuccess: () => {
      router.refresh();
      setShowDeleteAlert(false);
      toast.success(protectedPostConfig.successDelete);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon-sm">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="font-sans">
          <DropdownMenuItem asChild>
            <UnstyledLink
              href={`/${(type === 'BLOG'
                ? 'writing'
                : type
              ).toLowerCase()}/${slug}`}
              className="flex w-full"
              openNewTab
            >
              {protectedPostConfig.view}
            </UnstyledLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <UnstyledLink
              href={`/admin/writing/${id}`}
              className="flex w-full"
              openNewTab
            >
              {protectedPostConfig.edit}
            </UnstyledLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            {protectedPostConfig.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Delete alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="text-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {protectedPostConfig.questionDelete}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {protectedPostConfig.warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{protectedPostConfig.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={async () => await execute({ id })}>
              {isLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{protectedPostConfig.confirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

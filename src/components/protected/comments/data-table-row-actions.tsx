'use client';

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import { deleteComment } from '@/actions/writing/delete-comment';
import { updateCommentApproval } from '@/actions/writing/update-approval-status';
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
import protectedCommentConfig from '@/config/protected/protected-comment-config';
import { useAction } from '@/hooks/use-action';
import { TGetAllComments } from '@/lib/query/writing/get-comments';
import {
  MoreVertical,
  Loader2 as SpinnerIcon,
  Trash as TrashIcon,
} from 'lucide-react';
import { toast } from 'sonner';

interface DataTableRowActionsProps {
  row: TGetAllComments[number];
}

export function DataTableRowActions({
  row: {
    post: { id: postId, slug: postSlug },
    id: commentId,
    isApproved,
  },
}: DataTableRowActionsProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const { isLoading, execute } = useAction(deleteComment, {
    onSuccess: () => {
      router.refresh();
      setShowDeleteAlert(false);
      toast.success(protectedCommentConfig.successDelete);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { isLoading: commentUpdating, execute: updateComment } = useAction(
    updateCommentApproval,
    {
      onSuccess: () => {
        router.refresh();
        toast.success(protectedCommentConfig.successUpdate);
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
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
              href={`/writing/${postSlug}`}
              openNewTab
              className="flex w-full"
            >
              {protectedCommentConfig.viewPost}
            </UnstyledLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <UnstyledLink
              href={`/admin/writing/${postId}`}
              openNewTab
              className="flex w-full"
            >
              {protectedCommentConfig.editPost}
            </UnstyledLink>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex w-full"
            disabled={commentUpdating}
            onClick={() => {
              updateComment({ id: commentId });
            }}
          >
            {isApproved
              ? protectedCommentConfig.reject
              : protectedCommentConfig.approve}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            {protectedCommentConfig.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Delete alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="text-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {protectedCommentConfig.questionDelete}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {protectedCommentConfig.warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {protectedCommentConfig.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => await execute({ id: commentId })}
            >
              {isLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{protectedCommentConfig.confirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

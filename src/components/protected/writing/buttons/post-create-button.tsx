'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { createPost } from '@/actions/writing/create-post';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { protectedPostConfig } from '@/config/protected';
import { useAction } from '@/hooks/use-action';
import { Loader2 as SpinnerIcon } from 'lucide-react';

const PostCreateButton = () => {
  const router = useRouter();
  const { isLoading, execute } = useAction(createPost, {
    onSuccess: (post) => {
      router.refresh();
      router.push(`/admin/writing/${post.id}`);
    },
    onError: () => {},
  });

  return (
    <>
      <Button type="button" onClick={() => execute(undefined)} size="xs">
        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
        {protectedPostConfig.newPost}
      </Button>
      <AlertDialog open={isLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedPostConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PostCreateButton;

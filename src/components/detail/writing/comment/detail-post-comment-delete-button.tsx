/* eslint-disable unused-imports/no-unused-vars */
'use client';

import React, { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

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
import { detailCommentConfig } from '@/config/detail';
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from 'lucide-react';

/* eslint-disable unused-imports/no-unused-vars */

interface DetailPostCommentDeleteButtonProps {
  id?: string;
  userId?: string;
}

const DetailPostCommentDeleteButton: FC<DetailPostCommentDeleteButtonProps> = ({
  id = '',
  userId = '',
}) => {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // Delete bookmark
  async function deleteComment() {
    // setIsDeleteLoading(true);
    // if (id && session?.user.id && userId === session?.user.id) {
    //   const commentData = {
    //     id: id,
    //     userId: session?.user.id,
    //   };
    //   const response = await DeleteComment(commentData);
    //   if (response) {
    //     setIsDeleteLoading(false);
    //     toast.success(detailCommentConfig.successDeleted);
    //     router.refresh();
    //   } else {
    //     setIsDeleteLoading(false);
    //     toast.error(detailCommentConfig.errorDeleted);
    //   }
    // } else {
    //   setIsDeleteLoading(false);
    //   toast.error(detailCommentConfig.errorDeleted);
    // }
  }

  return (
    <>
      {/* {session?.user.id === userId && ( */}
      <>
        <div className="flex flex-shrink-0 self-center">
          <div className="relative inline-block text-left">
            <div className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
              <span className="sr-only">Delete comment</span>
              <TrashIcon
                onClick={() => setShowDeleteAlert(true)}
                className="h-4 w-4"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent className="text-md font-sans">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {detailCommentConfig.questionDelete}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {detailCommentConfig.warning}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {detailCommentConfig.cancel}
              </AlertDialogCancel>
              <AlertDialogAction onClick={deleteComment}>
                {isDeleteLoading ? (
                  <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <TrashIcon className="mr-2 h-4 w-4" />
                )}
                <span>{detailCommentConfig.confirm}</span>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
      {/* )} */}
    </>
  );
};

export default DetailPostCommentDeleteButton;

/* eslint-disable unused-imports/no-unused-vars */
import { FC, useState } from 'react';

import Image from 'next/image';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { protectedEditorConfig } from '@/config/protected';
import { Loader2 as SpinnerIcon, TrashIcon } from 'lucide-react';

interface EditorUploadCoverImageItemProps {
  userId: string;
  postId: string;
  imageUrl: string;
  blurDataURL?: string | null;
}

const EditorUploadCoverImageItem: FC<EditorUploadCoverImageItemProps> = ({
  userId,
  postId,
  imageUrl,
  blurDataURL,
}) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  // async function deleteImage() {
  //   setIsDeleteLoading(!isDeleteLoading);
  //   const imageData = {
  //     userId: userId,
  //     postId: postId,
  //     fileName: fileName,
  //   };
  //   const response = await DeleteCoverImage(imageData);
  //   if (response) {
  //     setIsDeleteLoading(false);
  //     toast.success(protectedEditorConfig.successMessagesDeleteImage);
  //     router.refresh();
  //   } else {
  //     setIsDeleteLoading(false);
  //     toast.error(protectedEditorConfig.errorMessagesDeleteImage);
  //   }
  // }
  return (
    <div className="col-span-full  ">
      <Image
        src={imageUrl}
        className="mb-5 rounded-lg shadow-sm"
        alt="Cover image"
        height={400}
        width={600}
        priority
        placeholder="blur"
        blurDataURL={blurDataURL || ''}
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <TrashIcon className="mr-2 h-4 w-4" />
            {protectedEditorConfig.deleteImage}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="font-sans">
            <AlertDialogTitle>
              {protectedEditorConfig.deleteImageQuestion}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {protectedEditorConfig.deleteImageDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="font-sans">
            <AlertDialogCancel>
              {protectedEditorConfig.cancel}
            </AlertDialogCancel>
            <AlertDialogAction disabled>
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{protectedEditorConfig.cofirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditorUploadCoverImageItem;

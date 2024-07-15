'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { updateLike } from '@/actions/writing/update-like';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'sonner';

interface DetailPostLikeButtonProps {
  likes: number;
  postId: string;
}

const DetailPostLikeButton: React.FC<DetailPostLikeButtonProps> = ({
  likes = 0,
  postId,
}) => {
  const router = useRouter();
  const { isLoading, execute } = useAction(updateLike, {
    onSuccess: () => {
      router.refresh();
      toast.success('Liked');
    },
    onError: () => {},
  });

  return (
    <Button
      type="button"
      className="relative w-full"
      size="lg"
      disabled={isLoading}
      onClick={() => {
        execute({ postId: postId });
      }}
    >
      <Heart className="mr-2 h-5 w-5" />
      <span className="absolute -right-[5px] -top-[10px] rounded-full bg-foreground px-[4px] text-xs font-semibold text-background shadow-sm ring-1">
        {likes}
      </span>
      Likes
    </Button>
  );
};

export default DetailPostLikeButton;

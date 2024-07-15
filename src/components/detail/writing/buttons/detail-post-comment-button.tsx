'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { detailCommentConfig } from '@/config/detail';
import { ChatTeardropDots } from '@phosphor-icons/react/dist/ssr';
import ScrollIntoView from 'react-scroll-into-view';

interface DetailPostCommentButtonProps {
  totalComments?: number;
}

const DetailPostCommentButton: React.FC<DetailPostCommentButtonProps> = ({
  totalComments = 0,
}) => {
  return (
    <ScrollIntoView selector="#comments" className="w-full">
      <Button
        type="button"
        variant="outline"
        className="relative w-full"
        size="lg"
      >
        <ChatTeardropDots className="mr-2 h-5 w-5 shrink-0" />
        <span className="absolute -right-[5px] -top-[10px] rounded-full bg-foreground px-[4px] text-xs font-semibold text-background shadow-sm ring-1">
          {totalComments}
        </span>
        {detailCommentConfig.comments}
      </Button>
    </ScrollIntoView>
  );
};

export default DetailPostCommentButton;

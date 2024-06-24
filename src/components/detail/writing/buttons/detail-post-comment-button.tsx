'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { detailCommentConfig } from '@/config/detail';
import { MessageCircle } from 'lucide-react';
import ScrollIntoView from 'react-scroll-into-view';

interface DetailPostCommentButtonProps {
  totalComments?: number;
}

const DetailPostCommentButton: React.FC<DetailPostCommentButtonProps> = ({
  totalComments = 0,
}) => {
  return (
    <ScrollIntoView selector="#comments" className="flex w-full">
      <Button
        type="button"
        variant="outline"
        className="relative w-full"
        size="lg"
      >
        <MessageCircle className="mr-2 h-4 w-4" />

        <span className="absolute -right-[5px] -top-[10px] rounded-full bg-foreground px-[4px] text-xs font-semibold text-background shadow-sm ring-1">
          {totalComments}
        </span>
        {detailCommentConfig.comments}
      </Button>
    </ScrollIntoView>
  );
};

export default DetailPostCommentButton;

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

interface DetailPostCommentItemProps {
  name?: string;
  image?: string | null;
  comment: string;
  date: Date;
  email?: string | null;
}

const DetailPostCommentItem: React.FC<DetailPostCommentItemProps> = ({
  name,
  image = '',
  comment,
  date,
  email,
}) => {
  return (
    <div className="my-6 flex flex-col rounded-md bg-background p-4 text-sm text-foreground">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={image || undefined} alt="Avatar" />
            <AvatarFallback>
              <span className="inline-block h-full w-full overflow-hidden rounded-full bg-muted">
                <svg
                  className="h-full w-full text-muted-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            {name || email?.split('@')[0] || 'Anonymous User'}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(date)}
          </p>
        </div>
      </div>
      <Separator className="mb-4 mt-2" />
      <div className="prose prose-sm max-w-none whitespace-pre-wrap text-muted-foreground">
        {comment}
      </div>
    </div>
  );
};

export default DetailPostCommentItem;

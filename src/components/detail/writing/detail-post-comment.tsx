'use client';

import React from 'react';

import {
  DetailPostCommentForm,
  DetailPostCommentItem,
  DetailPostCommentWrapper,
} from '@/components/detail/writing/comment';
import { useCurrentUser } from '@/hooks/use-current-user';
import { TGetComments } from '@/lib/query/writing/get-comments';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface DetailPostCommentProps {
  postId: string;
  comments: TGetComments;
}

const DetailPostComment: React.FC<DetailPostCommentProps> = ({
  postId = '',
  comments = [],
}) => {
  const user = useCurrentUser();

  return (
    <DetailPostCommentWrapper>
      <DetailPostCommentForm postId={postId} userId={user?.id} />
      <div className="pt-5">
        {comments?.map((comment) => (
          <DetailPostCommentItem
            key={comment.id}
            name={comment.user?.name}
            image={comment.user?.image}
            comment={comment.content}
            date={comment.createdAt}
          />
        ))}
      </div>
    </DetailPostCommentWrapper>
  );
};

export default DetailPostComment;

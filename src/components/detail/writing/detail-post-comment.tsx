'use client';

import React from 'react';

import {
  DetailPostCommentForm,
  DetailPostCommentItem,
  DetailPostCommentWrapper,
} from '@/components/detail/writing/comment';
import { TGetComments } from '@/lib/query/writing/get-comments';

interface DetailPostCommentProps {
  postId: string;
  comments: TGetComments;
}

const DetailPostComment: React.FC<DetailPostCommentProps> = ({
  postId = '',
  comments = [],
}) => {
  return (
    <DetailPostCommentWrapper>
      <DetailPostCommentForm postId={postId} />
      <div className="pt-5">
        {comments?.map((comment) => (
          <DetailPostCommentItem
            key={comment.id}
            name={comment.user?.name}
            image={comment.user?.image}
            comment={comment.content}
            date={comment.createdAt}
            email={comment?.email}
          />
        ))}
      </div>
    </DetailPostCommentWrapper>
  );
};

export default DetailPostComment;

import React from 'react';

import {
  DetailPostCommentButton,
  DetailPostShareButton,
} from '@/components/detail/writing/buttons';
import DetailPostLikeButton from '@/components/detail/writing/buttons/detail-post-like-button';
import { UnstyledLink } from '@/components/links';
import { Button } from '@/components/ui/button';
import { currentRole } from '@/lib/auth/queries/current-role';
import { UserRole } from '@prisma/client';

interface DetailPostFloatingBarProps {
  title: string;
  text: string;
  url: string;
  totalComments: number;
  id: string;
  likes: number;
}

const DetailPostFloatingBar: React.FC<DetailPostFloatingBarProps> = async ({
  title,
  text,
  likes,
  url,
  totalComments = 0,
  id,
}) => {
  const role = await currentRole();
  return (
    <>
      <div className="grid w-full grid-cols-3 justify-start gap-4 rounded-md">
        <DetailPostLikeButton likes={likes} postId={id} />
        <DetailPostCommentButton totalComments={totalComments} />
        <DetailPostShareButton title={title} text={text} url={url} />
        {role === UserRole.ADMIN && (
          <Button variant="outline" asChild>
            <UnstyledLink href={`/admin/writing/${id}`}>Edit</UnstyledLink>
          </Button>
        )}
      </div>
    </>
  );
};

export default DetailPostFloatingBar;

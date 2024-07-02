import React, { FC } from 'react';

import Skeleton from '@/components/ui/skeleton';
import WritingCard from './writing-card';
import { getAllPostSlugs } from '@/lib/query/writing/get-posts';
import { PostType } from '@/lib/enums';

interface Props {
  type: PostType;
}

const WritingSection: FC<Props> = async ({ type }) => {
  const data = await getAllPostSlugs({ take: 3, type });
  return (
    <>
      {data.map((d) => (
        <WritingCard key={d.id} {...d} />
      ))}
    </>
  );
};

export default WritingSection;

export const WritingLoading = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-96" />
      ))}
    </>
  );
};

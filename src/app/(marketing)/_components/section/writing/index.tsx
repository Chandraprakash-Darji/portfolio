import React from 'react';

import Skeleton from '@/components/ui/skeleton';
import WritingCard from './writing-card';
import { getAllPostSlugs } from '@/lib/query/writing/get-posts';

const WritingSection = async () => {
  const data = await getAllPostSlugs(3);
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

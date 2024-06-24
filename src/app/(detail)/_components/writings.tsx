import WritingCard from '@/app/(marketing)/_components/section/writing/writing-card';
import { getAllPostSlugs } from '@/lib/query/writing/get-posts';
import React from 'react';

const Writings = async () => {
  const data = await getAllPostSlugs();
  return (
    <>
      {data.map((d) => (
        <WritingCard key={d.id} {...d} />
      ))}
    </>
  );
};

export default Writings;

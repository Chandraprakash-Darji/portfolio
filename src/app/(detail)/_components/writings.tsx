import WritingCard from '@/app/(marketing)/_components/section/writing/writing-card';
import { PostType } from '@/lib/enums';
import { getAllPostSlugs } from '@/lib/query/writing/get-posts';
import React, { FC } from 'react';
interface Props {
  type: PostType;
}
const Writings: FC<Props> = async ({ type }) => {
  const data = await getAllPostSlugs({ type });
  return (
    <>
      {data.map((d) => (
        <WritingCard key={d.id} {...d} />
      ))}
    </>
  );
};

export default Writings;

import { FC } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PostCreateButton from '@/components/protected/writing/buttons/post-create-button';
import { postColumns } from '@/components/protected/writing/table/columns';
import { DataTable } from '@/components/protected/writing/table/data-table';
import TableEmpty from '@/components/table/emtpy-table';
import TableTitle from '@/components/table/table-title';
import { protectedPostConfig } from '@/config/protected';
import { currentUser } from '@/lib/auth/queries/current-user';
import getAllPostsAdmin from '@/lib/query/writing/get-posts';

export const revalidate = 0;

export const metadata: Metadata = {
  title: protectedPostConfig.title,
  description: protectedPostConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async () => {
  const user = await currentUser();

  const post = await getAllPostsAdmin(user?.id);

  if (!post) {
    return notFound();
  }
  return (
    <>
      <div className="layout-wide">
        {post?.length && post?.length > 0 ? (
          <>
            <TableTitle
              title={protectedPostConfig.title}
              description={protectedPostConfig.description}
              action={<PostCreateButton />}
            />
            <DataTable data={post ? post : []} columns={postColumns} />
          </>
        ) : (
          <TableEmpty action={<PostCreateButton />} />
        )}
      </div>
    </>
  );
};

export default PostsPage;

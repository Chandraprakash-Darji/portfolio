import { FC } from 'react';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { commentColumns } from '@/components/protected/comments/columns';
import { DataTable } from '@/components/protected/writing/table/data-table';
import TableEmpty from '@/components/table/emtpy-table';
import TableTitle from '@/components/table/table-title';
import protectedCommentConfig from '@/config/protected/protected-comment-config';
import { getAllComments } from '@/lib/query/writing/get-comments';

export const revalidate = 0;

export const metadata: Metadata = {
  title: protectedCommentConfig.title,
  description: protectedCommentConfig.description,
};

const CommentsPage: FC = async () => {
  const comments = await getAllComments();

  if (!comments) {
    return notFound();
  }
  return (
    <>
      <div className="layout-wide">
        {comments?.length && comments?.length > 0 ? (
          <>
            <TableTitle
              title={protectedCommentConfig.title}
              description={protectedCommentConfig.description}
            />
            <DataTable
              data={comments ? comments : []}
              columns={commentColumns}
            />
          </>
        ) : (
          <TableEmpty />
        )}
      </div>
    </>
  );
};

export default CommentsPage;

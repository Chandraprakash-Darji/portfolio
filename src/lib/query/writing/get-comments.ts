import db from '@/lib/db';

const getComments = async (postId: string) => {
  const comments = await db.comment.findMany({
    where: {
      postId,
      isApproved: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return comments;
};

export default getComments;
export type TGetComments = Awaited<ReturnType<typeof getComments>>;

export const getAllComments = async () => {
  const comments = await db.comment.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      email: true,
      isApproved: true,
      likes: true,
      post: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          replies: true,
        },
      },
    },
  });

  return comments;
};
export type TGetAllComments = Awaited<ReturnType<typeof getAllComments>>;

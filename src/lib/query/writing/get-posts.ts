import db from '@/lib/db';

const getAllPostsAdmin = async (userId?: string) => {
  const post = await db.post.findMany({
    where: {
      user: {
        id: userId,
        role: 'ADMIN',
      },
    },
    include: {
      categories: true,
      _count: {
        select: {
          categories: true,
          comments: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return post;
};

export default getAllPostsAdmin;
export type TGetPosts = Awaited<ReturnType<typeof getAllPostsAdmin>>;

export const getAllPostSlugs = async (take?: number) => {
  const post = await db.post.findMany({
    where: {
      published: true,
    },
    take,
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      likes: true,
      views: true,
    },
  });

  return post;
};
export type TGetAllPostSlugs = Awaited<ReturnType<typeof getAllPostSlugs>>;

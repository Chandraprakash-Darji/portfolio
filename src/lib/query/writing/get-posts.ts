import db from '@/lib/db';
import { PostType } from '@/lib/enums';

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
          likes: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return post;
};

export default getAllPostsAdmin;
export type TGetPosts = Awaited<ReturnType<typeof getAllPostsAdmin>>;

export const getAllPostSlugs = async ({
  take,
  type,
}: {
  take?: number;
  type: PostType;
}) => {
  const post = await db.post.findMany({
    where: {
      published: true,
      type,
    },
    take,
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      image: true,
      views: true,
      type: true,
      _count: {
        select: {
          likes: true,
          shares: true,
          comments: true,
        },
      },
    },
  });

  return post;
};
export type TGetAllPostSlugs = Awaited<ReturnType<typeof getAllPostSlugs>>;

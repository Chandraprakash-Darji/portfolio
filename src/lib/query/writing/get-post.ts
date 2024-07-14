import db from '@/lib/db';
import { PostType } from '@/lib/enums';

const getPost = async (id: string, userId?: string) => {
  const post = await db.post.findUnique({
    where: {
      id,
      user: {
        id: userId,
        role: 'ADMIN',
      },
    },
    include: { categories: true, user: true },
  });

  return post;
};

export default getPost;
export type TGetPost = Awaited<ReturnType<typeof getPost>>;

export const getPostBySlug = async ({
  slug,
  type,
}: {
  slug: string;
  type: PostType;
}) => {
  const post = await db.post.findUnique({
    where: {
      slug,
      published: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      content: true,
      image: true,
      imageBlurhash: true,
      updatedAt: true,
      views: true,
      likes: true,
      type: true,
      categories: {
        select: {
          slug: true,
          name: true,
          color: true,
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return post;
};
export type TGetPostBySlug = Awaited<ReturnType<typeof getPostBySlug>>;

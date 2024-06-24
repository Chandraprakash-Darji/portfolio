import db from '@/lib/db';

const getCategories = async () => {
  return await db.category.findMany({
    where: {
      posts: {
        some: {
          published: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export default getCategories;
export type TGetCategories = Awaited<ReturnType<typeof getCategories>>;

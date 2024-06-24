import db from '@/lib/db';

const updateViews = async (postId: string) => {
  const updatedView = await db.post.update({
    where: { id: postId },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return updatedView;
};

export default updateViews;

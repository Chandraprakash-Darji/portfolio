import { currentRole } from '@/lib/auth/queries/current-role';
import db from '@/lib/db';
import { UserRole } from '@/lib/enums';

const updateViews = async (postId: string) => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return;
  }

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

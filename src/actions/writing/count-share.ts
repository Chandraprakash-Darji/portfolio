'use server';

import { currentUser } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db from '@/lib/db';
import { ShareModel } from '@/lib/zod';
import { z } from 'zod';

const ZInputOptions = ShareModel.pick({
  postId: true,
  type: true,
});

type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, boolean>;

export const sharePost = createSafeAction(
  ZInputOptions,
  async ({ postId, type }): Promise<ReturnType> => {
    const user = await currentUser();

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await db.share.create({
      data: {
        postId: post.id,
        userId: user?.id,
        type,
      },
    });

    return { data: true };
  }
);

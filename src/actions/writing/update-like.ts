'use server';

import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db from '@/lib/db';
import { z } from 'zod';

const ZInputOptions = z.object({
  postId: z.string(),
});

type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, boolean>;

export const updateLike = createSafeAction(
  ZInputOptions,
  async ({ postId }): Promise<ReturnType> => {
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await db.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return { data: true };
  }
);

'use server';

import { currentUser } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db, { Comment } from '@/lib/db';
import { z } from 'zod';

const ZInputOptions = z.object({
  postId: z.string(),
  content: z.string(),
  email: z.string().optional(),
});

type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, Comment>;

export const postComment = createSafeAction(
  ZInputOptions,
  async ({ postId, content, email }): Promise<ReturnType> => {
    try {
      const user = await currentUser();

      const post = await db.post.findUnique({
        where: { id: postId },
      });

      if (!post) throw new Error('Post not found');

      const data = await db.comment.create({
        data: {
          content,
          postId,
          ...(user && { userId: user.id, isApproved: true }),
          ...(email && { email, isApproved: true }),
        },
      });

      return { data };
    } catch (error) {
      return {
        error: `Error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  }
);

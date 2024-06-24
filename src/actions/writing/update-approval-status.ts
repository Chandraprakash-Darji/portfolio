'use server';

import { currentAdmin } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db, { Comment } from '@/lib/db';
import { z } from 'zod';

const ZInputOptions = z.object({ id: z.string() });
type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, Comment>;

export const updateCommentApproval = createSafeAction(
  ZInputOptions,
  async ({ id }): Promise<ReturnType> => {
    try {
      const user = await currentAdmin();
      if (!user || !user.id) throw new Error('Unauthorized');

      const comment = await db.comment.findUnique({
        where: { id },
      });

      if (!comment) throw new Error('Comment not found');

      const data = await db.comment.update({
        where: { id },
        data: {
          isApproved: !comment.isApproved,
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

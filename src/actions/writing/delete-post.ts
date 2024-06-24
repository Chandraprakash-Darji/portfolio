'use server';

import { currentAdmin } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db, { Post } from '@/lib/db';
import { z } from 'zod';

const ZInputOptions = z.object({ id: z.string() });
type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, Post>;

export const deletePost = createSafeAction(
  ZInputOptions,
  async ({ id }): Promise<ReturnType> => {
    try {
      const user = await currentAdmin();
      if (!user || !user.id) throw new Error('Unauthorized');

      const data = await db.post.delete({ where: { id } });

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

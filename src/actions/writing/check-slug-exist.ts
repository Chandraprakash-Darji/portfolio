'use server';

import { currentUser } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db from '@/lib/db';
import { z } from 'zod';

const ZInputOptions = z.object({
  slug: z.string(),
});

type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, boolean>;

export const slugExist = createSafeAction(
  ZInputOptions,
  async ({ slug }): Promise<ReturnType> => {
    try {
      const user = await currentUser();
      if (!user) throw new Error('Unauthorized');

      const post = await db.post.findUnique({
        where: { slug },
      });

      return { data: !!post };
    } catch (error) {
      return {
        error: `Error: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      };
    }
  }
);

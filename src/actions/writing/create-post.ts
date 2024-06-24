'use server';

import { defaultEditorContent } from '@/components/protected/editor/wysiwyg/default-content';
import { currentAdmin } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db, { Post } from '@/lib/db';
import { randomUUID } from 'crypto';
import { z } from 'zod';

const ZInputOptions = z.never().optional();
type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, Post>;

export const createPost = createSafeAction(
  ZInputOptions,
  async (): Promise<ReturnType> => {
    try {
      const user = await currentAdmin();
      if (!user || !user.id) throw new Error('Unauthorized');

      const data = await db.post.create({
        data: {
          userId: user.id,
          slug: randomUUID(),
          title: 'Untitled',
          content: JSON.stringify(defaultEditorContent),
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

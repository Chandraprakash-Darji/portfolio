'use server';

import { currentAdmin } from '@/lib/auth/queries/current-user';
import { ActionState, createSafeAction } from '@/lib/create-safe-action';
import db, { Post, Prisma } from '@/lib/db';
import { PostModel } from '@/lib/zod';
import { z } from 'zod';

const ZInputOptions = PostModel.pick({
  title: true,
  slug: true,
  id: true,
  description: true,
  image: true,
  published: true,
  type: true,
  content: true,
})
  .partial()
  .extend({
    id: z.string(),
    keys: z
      .enum([
        'title',
        'slug',
        'description',
        'image',
        'published',
        'type',
        'content',
      ])
      .array(),
  });

type InputType = z.infer<typeof ZInputOptions>;
type ReturnType = ActionState<InputType, Post>;

export const updatePostMeta = createSafeAction(
  ZInputOptions,
  async ({
    title,
    slug,
    description,
    image,
    published,
    type,
    id,
    content,
    keys,
  }): Promise<ReturnType> => {
    try {
      const user = await currentAdmin();
      if (!user) throw new Error('Unauthorized');

      const postAccess = await db.post.count({
        where: { id, userId: user.id },
      });

      if (!postAccess) throw new Error('Unauthorized');

      // Update the post
      const updateData: Prisma.PostUpdateInput = {};
      if (keys.includes('title')) updateData.title = title;
      if (keys.includes('slug')) updateData.slug = slug;
      if (keys.includes('description')) updateData.description = description;
      if (keys.includes('image')) updateData.image = image;
      if (keys.includes('published')) updateData.published = published;
      if (keys.includes('type')) updateData.type = type;
      if (keys.includes('content')) updateData.content = content;
      const data = await db.post.update({
        where: { id },
        data: updateData,
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

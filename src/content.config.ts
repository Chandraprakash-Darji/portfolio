import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    imageBlurhash: z.string().optional(),
    publishedAt: z.string().optional(),
    updatedAt: z.string().optional(),
    published: z.boolean().default(true),
    categories: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string().optional(),
        })
      )
      .optional(),
  }),
});

const snippets = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/snippets' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    imageBlurhash: z.string().optional(),
    publishedAt: z.string().optional(),
    updatedAt: z.string().optional(),
    published: z.boolean().default(true),
    categories: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string().optional(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog, snippets };

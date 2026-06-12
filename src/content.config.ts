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
        }),
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
        }),
      )
      .optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.string(),
    status: z.enum(['building', 'active', 'archived']).default('active'),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
  }),
});

export const collections = { blog, snippets, projects };

import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

import { siteConfig } from '../../site.config';

const blogPosts = await getCollection('blog');
const snippetPosts = await getCollection('snippets');

const signature = `— ${siteConfig.author.name}`;

const pages: Record<string, { title: string; description?: string }> = {
  home: {
    title: 'Chandraprakash Darji',
    description: 'Full-stack developer. I build things and write about them.',
  },
  writing: {
    title: 'Writing',
    description:
      'Notes on software, systems, and the craft of building things.',
  },
  snippet: {
    title: 'Snippets',
    description: 'Short code snippets I find useful.',
  },
};

for (const post of blogPosts) {
  const slug = ['writing', post.id.replace(/\.mdx$/, '')].join('/');
  pages[slug] = {
    title: post.data.title,
    description: post.data.description || signature,
  };
}

for (const post of snippetPosts) {
  const slug = ['writing', post.id.replace(/\.mdx$/, '')].join('/');
  pages[slug] = {
    title: post.data.title,
    description: post.data.description || signature,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    format: 'WEBP',
    quality: 90,
    title: page.title,
    description: page.description,
    bgGradient: [[24, 24, 32]],
    border: { color: [225, 29, 72], width: 4 },
    logo: {
      path: './src/pages/og/_images/logo.png',
      size: [300],
    },
    font: {
      title: {
        color: [255, 255, 255],
        size: 64,
        families: ['DM Sans'],
        weight: 'Medium',
        lineHeight: 1.2,
      },
      description: {
        color: [180, 180, 200],
        size: 36,
        families: ['DM Sans'],
        weight: 'Normal',
        lineHeight: 1.2,
      },
    },
    fonts: [
      './src/pages/og/_fonts/dm-sans-400.ttf',
      './src/pages/og/_fonts/dm-sans-500.ttf',
      './src/pages/og/_fonts/dm-sans-700.ttf',
    ],
  }),
});

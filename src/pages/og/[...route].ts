import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const blogPosts = await getCollection('blog');
const snippetPosts = await getCollection('snippets');

const pages: Record<string, { title: string; description?: string }> = {
  home: {
    title: 'Chandraprakash Darji',
    description: 'Full-stack developer. I build things and write about them.',
  },
  writing: {
    title: 'Writing',
    description: 'Notes on software, systems, and the craft of building things.',
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
    description: post.data.description,
  };
}

for (const post of snippetPosts) {
  const slug = ['writing', post.id.replace(/\.mdx$/, '')].join('/');
  pages[slug] = {
    title: post.data.title,
    description: post.data.description,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[24, 24, 32]],
    border: { color: [225, 29, 72], width: 4 },
    font: {
      title: { color: [255, 255, 255], size: 64 },
      description: { color: [180, 180, 200], size: 36 },
    },
  }),
});

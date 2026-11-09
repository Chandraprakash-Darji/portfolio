import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

import { lessons } from '../../data/javascript-lessons';
import { siteConfig } from '../../site.config';

const blogPosts = await getCollection('blog');
const snippetPosts = await getCollection('snippets');
const projectPosts = await getCollection('projects');

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
  projects: {
    title: 'Projects',
    description: 'case studies — what i built and the decisions behind it',
  },
  about: {
    title: 'About',
    description: 'Software systems designer. Architecture, DevOps & distributed systems.',
  },
  frames: {
    title: 'Frames',
    description: 'photos i capture. full quality, no recompression.',
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

for (const post of projectPosts) {
  const slug = ['projects', post.id.replace(/\.mdx$/, '')].join('/');
  pages[slug] = {
    title: post.data.title,
    description: post.data.description || signature,
  };
}

pages['learn/javascript'] = {
  title: 'Learn JavaScript',
  description: 'An interactive guide: runnable examples, 7 chapters, one idea at a time.',
};
for (const lesson of lessons) {
  pages[`learn/javascript/${lesson.slug}`] = {
    title: `${lesson.number} ${lesson.title}`,
    description: `JS Recap · Chapter ${lesson.chapterNumber}: ${lesson.chapter.title}`,
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
    // Frame, dot grid and footer are baked into the background; the top label is the "logo".
    bgImage: { path: './src/pages/og/_images/background.png', fit: 'cover' },
    padding: 80,
    logo: {
      path: './src/pages/og/_images/logo.png',
      size: [212],
    },
    font: {
      title: {
        color: [250, 250, 250],
        size: 64,
        families: ['Geist'],
        weight: 'Medium',
        lineHeight: 1.1,
      },
      description: {
        color: [163, 163, 163],
        size: 26,
        families: ['Geist Mono'],
        weight: 'Normal',
        lineHeight: 1.4,
      },
    },
    fonts: [
      './src/pages/og/_fonts/geist-400.ttf',
      './src/pages/og/_fonts/geist-500.ttf',
      './src/pages/og/_fonts/geist-mono-400.ttf',
    ],
  }),
});

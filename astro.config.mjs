import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import umami from '@yeskunall/astro-umami';
import { defineConfig, fontProviders } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { siteConfig } from './src/site.config';

const blogModules = import.meta.glob('./src/content/blog/*.mdx');
const snippetModules = import.meta.glob('./src/content/snippets/*.mdx');

const blogMdPages = Object.keys(blogModules).map((f) => {
  const slug = f.split('/').pop().replace('.mdx', '');
  return `${siteConfig.url}/writing/${slug}.md`;
});
const snippetMdPages = Object.keys(snippetModules).map((f) => {
  const slug = f.split('/').pop().replace('.mdx', '');
  return `${siteConfig.url}/snippet/${slug}.md`;
});

export default defineConfig({
  site: siteConfig.url,

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'DM Sans',
      cssVariable: '--font-dm-sans',
    },
  ],

  integrations: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ],
      shikiConfig: {
        theme: 'poimandres',
      },
    }),
    react(),
    sitemap({
      customPages: [...blogMdPages, ...snippetMdPages],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    umami({
      id: '20fc61c2-6c23-40a3-9a46-5c215e1ca9f0',
      endpointUrl: 'https://unami-kohl.vercel.app',
      hostUrl: 'https://unami-kohl.vercel.app',
    }),
  ],
  adapter: vercel(),
});

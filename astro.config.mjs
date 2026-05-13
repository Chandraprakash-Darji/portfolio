import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { siteConfig } from './src/site.config';
import umami from '@yeskunall/astro-umami';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: siteConfig.url,

  fonts: [{
    provider: fontProviders.fontsource(),
    name: 'DM Sans',
    cssVariable: '--font-dm-sans',
  }],

  integrations: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append' }],
      ]
    }),
    react(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    umami({
      id: '20fc61c2-6c23-40a3-9a46-5c215e1ca9f0',
      endpointUrl: 'https://unami-kohl.vercel.app',
      hostUrl: 'https://unami-kohl.vercel.app',
    }),
  ],

  markdown: {
    shikiConfig: {
      theme: 'poimandres',
    },
  },

  adapter: vercel(),
});
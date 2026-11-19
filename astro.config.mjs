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

import { canonicalRedirectsIntegration } from './src/lib/canonical-redirects';
import { applyLastmod, contentLastmod } from './src/lib/sitemap-lastmod';
import { siteConfig } from './src/site.config';

const lastmodByPath = contentLastmod();

export default defineConfig({
  site: siteConfig.url,
  trailingSlash: 'never',
  redirects: {
    '/snippet/[slug]': '/writing/[slug]',
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-geist',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
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
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      },
    }),
    react(),
    sitemap({
      filter: (page) => !page.endsWith('.md'),
      serialize(item) {
        return applyLastmod(item, lastmodByPath);
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    umami({
      id: '20fc61c2-6c23-40a3-9a46-5c215e1ca9f0',
      endpointUrl: 'https://unami.rega.run',
      hostUrl: 'https://unami.rega.run',
    }),
    canonicalRedirectsIntegration(),
  ],
  adapter: vercel(),
});

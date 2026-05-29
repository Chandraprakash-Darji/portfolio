import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig } from '../site.config';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const published = posts
    .filter((p) => p.data.published !== false)
    .toSorted(
      (a, b) =>
        b.data.publishedAt?.localeCompare(a.data.publishedAt ?? '') ?? 0,
    );

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: published.map((post) => {
      const slug = post.id.replace(/\.mdx$/, '');
      return {
        title: post.data.title,
        description: post.data.description ?? '',
        pubDate: post.data.publishedAt
          ? new Date(post.data.publishedAt)
          : new Date(),
        link: `/writing/${slug}/`,
      };
    }),
    customData: `<language>en-us</language>`,
  });
}

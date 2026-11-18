import { getCollection } from 'astro:content';
import { siteConfig } from '../../site.config';

// On demand so the canonical Link header survives; Vercel drops headers from prerendered files.
export const prerender = false;

export async function GET({ params }: { params: { slug: string } }) {
  const posts = [
    ...(await getCollection('blog')),
    ...(await getCollection('snippets')),
  ];
  const entry = posts.find((p) => p.id.replace(/\.mdx$/, '') === params.slug);

  if (!entry || entry.data.published === false || entry.body == null) {
    return new Response('Not found', { status: 404 });
  }

  const title = entry.data.title;
  const body = `# ${title}\n\n${entry.body}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: `<${siteConfig.url}/writing/${params.slug}>; rel="canonical"`,
    },
  });
}

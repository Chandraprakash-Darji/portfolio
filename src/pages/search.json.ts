import { getCollection } from 'astro:content';

export async function GET() {
  const blog = await getCollection('blog');
  const snippets = await getCollection('snippets');

  const items = [
    { type: 'page', title: 'home', href: '/' },
    { type: 'page', title: 'writing', href: '/writing' },
    { type: 'page', title: 'snippets', href: '/snippet' },
    { type: 'page', title: 'about', href: '/about' },
    ...blog
      .filter((p) => p.data.published !== false)
      .map((p) => ({
        type: 'post',
        title: p.data.title,
        description: p.data.description ?? '',
        categories: (p.data.categories ?? []).map((c) => c.name),
        href: `/writing/${p.id.replace(/\.mdx$/, '')}`,
      })),
    ...snippets
      .filter((p) => p.data.published !== false)
      .map((p) => ({
        type: 'snippet',
        title: p.data.title,
        description: p.data.description ?? '',
        categories: (p.data.categories ?? []).map((c) => c.name),
        href: `/writing/${p.id.replace(/\.mdx$/, '')}`,
      })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}

import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts
    .filter((p) => p.data.published !== false)
    .map((entry) => ({
      params: { slug: entry.id.replace(/\.mdx$/, '') },
    }));
}

export async function GET({ params }: { params: { slug: string } }) {
  const posts = await getCollection('blog');
  const entry = posts.find((p) => p.id.replace(/\.mdx$/, '') === params.slug);

  if (!entry || entry.body == null) {
    return new Response('Not found', { status: 404 });
  }

  const title = entry.data.title;
  const body = `# ${title}\n\n${entry.body}`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

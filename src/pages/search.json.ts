import { getCollection } from 'astro:content';
import { frames as framesManifest } from '../constant/frames';

export async function GET() {
  const blog = await getCollection('blog');
  const snippets = await getCollection('snippets');
  const projects = await getCollection('projects');

  const items = [
    { type: 'page', title: 'home', href: '/' },
    { type: 'page', title: 'projects', href: '/projects' },
    { type: 'page', title: 'writings', href: '/writing' },
    { type: 'page', title: 'snippets', href: '/snippet' },
    { type: 'page', title: 'frames', href: '/frames' },
    { type: 'page', title: 'about', href: '/about' },
    ...blog
      .filter((p) => p.data.published !== false)
      .map((p) => ({
        type: 'writings',
        title: p.data.title,
        description: p.data.description ?? '',
        categories: (p.data.categories ?? []).map((c) => c.name),
        href: `/writing/${p.id.replace(/\.mdx$/, '')}`,
      })),
    ...snippets
      .filter((p) => p.data.published !== false)
      .map((p) => ({
        type: 'snippets',
        title: p.data.title,
        description: p.data.description ?? '',
        categories: (p.data.categories ?? []).map((c) => c.name),
        href: `/writing/${p.id.replace(/\.mdx$/, '')}`,
      })),
    ...projects
      .filter((p) => p.data.published !== false)
      .map((p) => ({
        type: 'projects',
        title: p.data.title,
        description: p.data.description ?? '',
        href: `/projects/${p.id.replace(/\.mdx$/, '')}`,
      })),
    ...framesManifest.map((f, i) => ({
      type: 'frames',
      title: f.pathname.replace(/\.[^.]+$/, ''),
      image: f.thumbUrl,
      href: `/frames?photoId=${i}`,
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
}

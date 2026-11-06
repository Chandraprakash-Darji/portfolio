import { defineMiddleware } from 'astro/middleware';
import { siteConfig } from './site.config';

export const onRequest = defineMiddleware(async ({ request, url }, next) => {
  const response = await next();
  if (url.pathname !== '/' && response.status !== 404) return response;
  const vary = response.headers.get('Vary');
  const headers = new Headers(response.headers);
  headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  const accepts = (request.headers.get('Accept') ?? '').split(',').map((part) => {
    const [type, ...parameters] = part.trim().split(';');
    const q = parameters.find((p) => p.trim().startsWith('q='));
    return { type, quality: q ? Number(q.trim().slice(2)) : 1 };
  });
  const quality = (type: string) => accepts.find((a) => a.type === type)?.quality ?? 0;
  if (quality('text/markdown') > 0 && quality('text/markdown') >= quality('text/html')) {
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.delete('Content-Length');
    headers.delete('ETag');
    const body = response.status === 404
      ? '# Page not found\n\nThe requested page does not exist. Browse [site guidance](/llms.txt) or return [home](/).\n'
      : `# ${siteConfig.author.name}\n\n${siteConfig.description}\n\nSoftware engineer in India working on backends, architecture, DevOps and distributed systems. I write about architecture decisions, infrastructure costs, pipelines and lessons from shipping software.\n\n## Explore\n\n- [Projects](/projects)\n- [Writing](/writing)\n- [Code snippets](/snippet)\n- [About](/about)\n- [Contact](/contact)\n- [Privacy](/privacy)\n- [Agent guidance](/llms.txt)\n\n## Contact\n\nEmail [me@elregaldo.com](mailto:me@elregaldo.com). ${siteConfig.availableForWork ? `Open to freelance work: [book a call](${siteConfig.calLink}).` : ''}\n`;
    return new Response(body, { status: response.status, headers });
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
});

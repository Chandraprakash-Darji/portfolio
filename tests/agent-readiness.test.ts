import { describe, it, expect } from 'vitest';
import { onRequest } from '../src/middleware';

const run = async (path: string, accept: string, status = 200) => {
  const url = new URL(path, 'https://www.elregaldo.com');
  const response = await onRequest({ url, request: new Request(url, { headers: { Accept: accept } }) } as Parameters<typeof onRequest>[0], async () => new Response('<h1>Original HTML</h1>', { status, headers: { 'Content-Type': 'text/html' } }));
  if (!response) throw new Error("Expected response");
  return response;
};
describe('agent content negotiation', () => {
  it('serves Markdown on the homepage', async () => {
    const response = await run('/', 'text/markdown');
    expect(response.headers.get('Content-Type')).toContain('text/markdown');
    expect(response.headers.get('Vary')).toContain('Accept');
    expect(await response.text()).toContain('# Chandraprakash Darji');
  });
  it('preserves HTML and respects quality preferences', async () => {
    for (const accept of ['text/html', 'text/markdown;q=0', 'text/html,text/markdown;q=0.5']) {
      const response = await run('/', accept);
      expect(response.headers.get('Content-Type')).toBe('text/html');
      expect(await response.text()).toBe('<h1>Original HTML</h1>');
    }
  });
  it('preserves 404 status with Markdown guidance', async () => {
    const response = await run('/missing', 'text/markdown', 404);
    expect(response.status).toBe(404);
    expect(response.headers.get('Content-Type')).toContain('text/markdown');
    expect(await response.text()).toContain('[site guidance](/llms.txt)');
  });
});

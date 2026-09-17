import designMd from '@/content/design.md?raw';

export function GET() {
  return new Response(designMd, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}

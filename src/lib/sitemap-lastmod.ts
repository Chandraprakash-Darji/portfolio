import type { SitemapItem } from '@astrojs/sitemap';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function dateFromFrontmatter(text: string): string | null {
  const end = text.startsWith('---') ? text.indexOf('\n---', 3) : -1;
  const frontmatter = end === -1 ? '' : text.slice(0, end);
  const read = (key: string): string | null => {
    const line = frontmatter
      .split('\n')
      .find((entry) => entry.startsWith(`${key}:`));
    const match = line?.match(/['"](\d{4}-\d{2}-\d{2})['"]/);
    return match?.[1] ?? null;
  };
  return read('updatedAt') ?? read('publishedAt');
}

function gitDate(root: string, file: string): string | null {
  if (!fs.existsSync('/usr/bin/git')) return null;
  const result = spawnSync(
    '/usr/bin/git',
    ['log', '-1', '--format=%cs', '--', file],
    {
      cwd: root,
      encoding: 'utf8',
    },
  );
  const date = result.stdout.trim();
  return DATE.test(date) ? date : null;
}

function remember(
  dates: Map<string, string>,
  key: string,
  date: string | null,
): void {
  if (date) dates.set(key, date);
}

function datePages(root: string, dates: Map<string, string>): void {
  const pages: [string, string][] = [
    ['src/pages/index.astro', '/'],
    ['src/pages/about.astro', '/about'],
    ['src/pages/contact.astro', '/contact'],
    ['src/pages/privacy.astro', '/privacy'],
    ['src/pages/frames.astro', '/frames'],
    ['src/pages/projects/index.astro', '/projects'],
    ['src/pages/writing/index.astro', '/writing'],
    ['src/pages/snippet/index.astro', '/snippet'],
    ['src/pages/learn/javascript/index.astro', '/learn/javascript'],
  ];
  for (const [file, key] of pages) remember(dates, key, gitDate(root, file));
}

function isContentFile(name: string, mdxOnly = false): boolean {
  if (name.endsWith('.mdx')) return true;
  return !mdxOnly && name.endsWith('.md');
}

function dateDirectory(
  root: string,
  dates: Map<string, string>,
  dir: string,
  prefix: string,
  options: { mdxOnly?: boolean; skipExisting?: boolean } = {},
): void {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return;
  for (const name of fs.readdirSync(absolute)) {
    if (!isContentFile(name, options.mdxOnly)) continue;
    const key = `${prefix}/${name.slice(0, name.lastIndexOf('.'))}`;
    if (options.skipExisting && dates.has(key)) continue;
    const relative = path.posix.join(dir, name);
    const text = fs.readFileSync(path.join(root, relative), 'utf8');
    remember(dates, key, dateFromFrontmatter(text) ?? gitDate(root, relative));
  }
}

export function contentLastmod(root = process.cwd()): Map<string, string> {
  const dates = new Map<string, string>();
  datePages(root, dates);
  dateDirectory(root, dates, 'src/content/projects', '/projects');
  dateDirectory(root, dates, 'src/content/javascript', '/learn/javascript');
  dateDirectory(root, dates, 'src/content/blog', '/writing', { mdxOnly: true });
  dateDirectory(root, dates, 'src/content/snippets', '/writing', {
    mdxOnly: true,
    skipExisting: true,
  });
  return dates;
}

function withoutTrailingSlash(pathname: string): string {
  let end = pathname.length;
  while (end > 1 && pathname[end - 1] === '/') end -= 1;
  return pathname.slice(0, end);
}

export function applyLastmod(
  item: SitemapItem,
  dates: Map<string, string>,
): SitemapItem {
  const url = new URL(item.url);
  if (url.pathname !== '/') url.pathname = withoutTrailingSlash(url.pathname);
  const date = dates.get(url.pathname);
  if (date) item.lastmod = new Date(`${date}T00:00:00.000Z`).toISOString();
  item.url = url.href;
  return item;
}

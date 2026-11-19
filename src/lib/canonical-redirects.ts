import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// Exact hosts only. An unanchored "elregaldo.com" would also match www.elregaldo.com and loop.
export const LEGACY_HOST = String.raw`^(?:chandraprakash\.vercel\.app|elregaldo\.com)$`;

type RouteCondition = {
  type: 'host';
  value: string;
};

type RedirectRoute = {
  src: string;
  headers: { Location: string };
  status: number;
  has?: RouteCondition[];
};

type VercelRoute = {
  src?: string;
  status?: number;
  headers?: { Location?: string };
  has?: { type: string; value?: string }[];
};

const legacyHost: RouteCondition = { type: 'host', value: LEGACY_HOST };

function redirect(
  src: string,
  location: string,
  legacy = false,
): RedirectRoute {
  const route: RedirectRoute = {
    src,
    headers: { Location: location },
    status: 308,
  };
  if (legacy) route.has = [legacyHost];
  return route;
}

// Vercel emits trailing-slash normalization before user redirects, and it keeps the
// original host. These routes are prepended so a legacy host and a trailing slash
// collapse to the final www URL in one hop when the request reaches this deployment.
export function canonicalRedirectRoutes(): RedirectRoute[] {
  return [
    redirect(
      String.raw`^/sitemap\.xml/*$`,
      'https://www.elregaldo.com/sitemap-index.xml',
      true,
    ),
    redirect(String.raw`^/sitemap\.xml/*$`, '/sitemap-index.xml'),
    redirect(
      '^/snippet/([^/]+)/+$',
      'https://www.elregaldo.com/writing/$1',
      true,
    ),
    redirect(
      '^/snippet/([^/]+)$',
      'https://www.elregaldo.com/writing/$1',
      true,
    ),
    redirect('^/snippet/([^/]+)/+$', '/writing/$1'),
    redirect('^/(.*[^/])/+$', 'https://www.elregaldo.com/$1', true),
    redirect('^/(.*)$', 'https://www.elregaldo.com/$1', true),
  ];
}

function isOwned(route: VercelRoute): boolean {
  return canonicalRedirectRoutes().some(
    (owned) =>
      owned.src === route.src &&
      owned.headers.Location === route.headers?.Location &&
      Boolean(owned.has) === Boolean(route.has),
  );
}

export function withCanonicalRedirects(
  routes: VercelRoute[],
): Array<RedirectRoute | VercelRoute> {
  return [
    ...canonicalRedirectRoutes(),
    ...routes.filter((route) => !isOwned(route)),
  ];
}

const HOMEPAGE_LOC = '<loc>https://www.elregaldo.com</loc>';
const HOMEPAGE_CANONICAL_LOC = '<loc>https://www.elregaldo.com/</loc>';

// @astrojs/sitemap removes the homepage slash when trailingSlash is "never".
// The canonical tag keeps it, so put that slash back after the sitemap is written.
function restoreHomepageSlash(file: string): void {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, 'utf8');
  const next = text.replaceAll(HOMEPAGE_LOC, HOMEPAGE_CANONICAL_LOC);
  if (next !== text) fs.writeFileSync(file, next);
}

export function canonicalRedirectsIntegration(): AstroIntegration {
  return {
    name: 'canonical-redirects',
    hooks: {
      'astro:build:done': () => {
        const configPath = path.join(
          process.cwd(),
          '.vercel/output/config.json',
        );
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8')) as {
          routes?: VercelRoute[];
        };
        config.routes = withCanonicalRedirects(config.routes ?? []);
        fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
        for (const file of [
          'dist/client/sitemap-0.xml',
          '.vercel/output/static/sitemap-0.xml',
        ]) {
          restoreHomepageSlash(path.join(process.cwd(), file));
        }
      },
    },
  };
}

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
bun run dev          # Astro dev server with HMR
bun run build        # Production build (SSG via Vercel adapter)
bun run preview      # Preview production build locally
bun run typecheck    # tsc --noEmit
bun run lint         # astro check
bun run lint:fix     # eslint --fix + prettier -w ./src
bun run format       # prettier -w ./src
bun test             # vitest
```

## Architecture

Astro 6 SSG site deployed on Vercel. React components are used only as interactive islands (`client:load`) or MDX component overrides. Layout-shell pieces (Navbar, Footer, WritingSection) are `.astro` files.

### Content layer (Astro 6)

Content collections are defined in `src/content.config.ts` using the content layer API — two `glob` loaders for `blog` and `snippets`, both with identical Zod schemas (title, description, publishedAt, categories). Content lives in `src/content/blog/*.mdx` and `src/content/snippets/*.mdx`.

The `writing/[slug].astro` page handles **both** collections — it searches blog then snippets to find the matching entry. The `isSnippet` boolean controls back links, URL paths, and OG image routes.

### Routing

- `/writing` — blog listing; `/writing/:slug` — individual post (handles both blog + snippets)
- `/snippet` — snippet listing
- `writing/[slug].md.ts` and `snippet/[slug].md.ts` — serve raw `.md` content via `Content-Type: text/markdown` (used by the PostHeader "Copy Page" button)
- `og/[...route].ts` — dynamic OG image generation via `astro-og-canvas`

### Component architecture

```
Astro (.astro)     → layout shell, pages, nav/footer
React (.tsx)       → interactive islands (client:load) + MDX overrides
  client:load:       PostHeader, TableOfContents, ReadingProgress
  MDX override:      Pre (code blocks), CustomLink (links)
  UI primitives:     Button (CVA, 15 variants), ButtonGroup, icons
```

The `PostHeader` toolbar (copy, view-options dropdown, share dropdown, prev/next navigation) is a single React component adapted from fumadocs patterns. It references the raw `.md` endpoint for copying and uses `sonner` for toasts.

### Dark/light mode

CSS custom properties in `globals.css` — `:root` holds light values, `.dark` holds dark values. Tailwind uses `darkMode: 'class'`. The `<html>` element starts with `class="dark"` (dark by default). An inline script in `BaseLayout.astro` reads `localStorage.theme` before paint to prevent flash. The toggle is a minimal button in `Navbar.astro` that flips the `dark` class and persists to localStorage. Giscus comments are loaded dynamically and listen for theme changes via MutationObserver.

`prose-invert` is toggled via Tailwind's `dark:prose-invert` rather than hardcoded.

### Styling

All colors are `hsl(var(--...))` CSS custom properties defined in `globals.css`. The `cn()` utility from `src/lib/utils.ts` merges Tailwind classes with `clsx` + `tailwind-merge`. Prose/content styles for rendered MDX live in `prosemirror.css` (despite the name — it covers code blocks, blockquotes, heading anchors, etc., not just ProseMirror).

### Assets

Blog post assets follow the pattern `/public/writing/{slug}/...`. Each post's SVGs, images, etc. live in its own directory under that path.

### MDX processing

`astro.config.mjs` configures: `remark-gfm` (tables, strikethrough), `rehype-slug` + `rehype-autolink-headings` (heading IDs and anchors), and Shiki with `poimandres` theme for syntax highlighting. The `<Content />` component is rendered with custom overrides: `{ pre: Pre, a: CustomLink }`.

### Integrations

- **Umami analytics**: Custom tracking via `window.umami.track()` in `src/lib/analytics.ts`. `UnstyledLink` accepts a `trackEventTag` prop that fires on click.
- **Giscus comments**: Loaded dynamically in `writing/[slug].astro` with theme that follows light/dark mode.
- **RSS**: Blog posts only, sorted by `publishedAt` desc. Linked in `<head>` and footer.
- **Sitemap**: Custom pages include `.md` endpoint URLs for all blog/snippet posts for SEO.
- **OG images**: Generated at build time for every page and post via `astro-og-canvas`.

### Site config

`src/site.config.ts` exports `siteConfig` with url, title, description, and author info. The URL defaults to `https://chandraprakash.vercel.app` and can be overridden via `NEXT_PUBLIC_WEB_URL` env var.

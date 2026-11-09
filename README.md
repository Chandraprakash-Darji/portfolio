# elregaldo.com

The personal site of Chandraprakash Darji: writing, code snippets, projects, photo frames, and **JS Recap**, an interactive JavaScript guide.

Live at [elregaldo.com](https://www.elregaldo.com).

## What's inside

| Section | Path | Source |
| --- | --- | --- |
| Blog | `/writing` | `src/content/blog/*.mdx` |
| Snippets | `/snippet` | `src/content/snippets/*.mdx` |
| Projects | `/projects` | `src/content/projects` |
| Frames | `/frames` | `src/constant/frames` |
| JS Recap | `/learn/javascript` | `src/content/javascript/*.md` |

Every post and snippet is also served as plain Markdown (`/writing/<slug>.md`), and `/llms.txt` describes the site for AI agents.

## JS Recap

A JavaScript guide built from my [js-recap](https://github.com/Chandraprakash-Darji/js-recap) notes, which follow Jonas Schmedtmann's [Complete JavaScript Course](https://www.udemy.com/course/the-complete-javascript-course/).

- **Chapters and sections.** `src/data/javascript-lessons.ts` groups the notes into 7 chapters. Pages are numbered like `3.2 Arrays`.
- **Runnable examples.** At build time each code block is run in an isolated sandbox. Blocks that print without errors get Run and Reset buttons, and visitors can edit them and see the console output in the browser.
- **Interactive demos** for the event loop, closures, references, events and prototypes (`src/components/learn/Playground.tsx`).
- **Glossary.** Terms get popover definitions in the text and a searchable list on the guide page.
- **Discussion.** Each section has its own comment thread through GitHub Discussions (giscus).

The notes live in this repo now; edit them in `src/content/javascript/` and the chapter list in `src/data/javascript-lessons.ts`.

## Stack

- [Astro 6](https://astro.build), statically generated and deployed on Vercel
- React for interactive islands, Tailwind for styling
- MDX with Shiki, `remark-gfm` and heading anchors
- giscus comments, Umami analytics, RSS, sitemap and generated OG images

## Development

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev        # http://localhost:4321
bun run build      # production build
bun test           # vitest
bun run lint       # astro check + oxlint
bun run typecheck
```

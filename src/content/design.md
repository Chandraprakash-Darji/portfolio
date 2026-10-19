# Design System

How this portfolio looks and why. Single source of truth for colors,
typography, themes, the TUI component language, and prose styling.

Files: `src/styles/globals.css` (tokens, themes, utilities),
`src/styles/prosemirror.css` (prose/MDX styles),
`tailwind.config.ts` (fonts, animations), `src/layouts/BaseLayout.astro`
(theme bootstrap), `src/components/TuiCard.astro` (card frame).

## Principles

1. **Dark first.** The site boots dark; light is opt-in. Both are monochrome.
2. **Square cards.** Cards and panels stay square with a 1px border; controls
   use `--radius` (`0.625rem`).
3. **Type-led hierarchy.** Geist for prose/UI, Geist Mono for code,
   labels, and status chrome. Pixel font is reserved for the easter-egg theme.
4. **Terminal-flavored chrome.** Panels with titled top borders, corner-bracket
   cards, mono uppercase micro-labels, status bars.

## Color tokens

All colors are `hsl(var(--…))` custom properties. Tailwind maps them 1:1
(`background`, `foreground`, `primary`, `secondary`, `muted`, `accent`,
`popover`, `card`, `border`, `input`, `ring`, plus `destructive`).

### Light (`:root` in `globals.css`)

Neutral greys (shadcn neutral, stored as HSL triplets).

| Token | Value |
| --- | --- |
| `--background` / `--card` / `--popover` | `0 0% 100%` |
| `--foreground` / `--card-foreground` / `--popover-foreground` | `0 0% 3.9%` |
| `--primary` / `--secondary-foreground` / `--accent-foreground` | `0 0% 9%` |
| `--primary-foreground` | `0 0% 98%` |
| `--secondary` / `--muted` / `--accent` | `0 0% 96.1%` |
| `--muted-foreground` | `0 0% 45.2%` |
| `--destructive` | `0 72% 51%` |
| `--border` / `--input` | `0 0% 89.8%` |
| `--ring` | `0 0% 63%` |
| `--radius` | `0.625rem` |

### Dark (`.dark`, the default)

| Token | Value |
| --- | --- |
| `--background` / `--card` | `0 0% 3.9%` |
| `--foreground` / `--card-foreground` / `--popover-foreground` / `--secondary-foreground` / `--accent-foreground` | `0 0% 98%` |
| `--popover` | `0 0% 9%` |
| `--primary` | `0 0% 89.8%` |
| `--primary-foreground` | `0 0% 9%` |
| `--secondary` / `--muted` / `--accent` / `--border` | `0 0% 14.9%` |
| `--muted-foreground` | `0 0% 63%` |
| `--input` | `0 0% 17.5%` |
| `--ring` | `0 0% 45.2%` |
| `--destructive` | `0 91% 71%` |
| `--radius` | `0.625rem` |

### TUI extras (both themes)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--accent-blue` | `0 0% 9%` | `0 0% 98%` | neutral accent, home page only (`.tui-home` rebinds `--primary` to it) |
| `--success` | `114 58% 40%` | `115 54% 76%` | Green status |

## Typography

| Role | Font | Source |
| --- | --- | --- |
| UI / prose (`font-sans`, `font-primary`) | Geist (`--font-geist`) | Astro font provider (fontsource) in `astro.config.mjs` |
| Code / mono (`font-mono`) | Geist Mono (`--font-geist-mono`) | Astro font provider (fontsource) in `astro.config.mjs` |
| Pixel theme body | Noto Sans (`--font-body`) | Google Fonts link in `BaseLayout.astro` |
| Pixel theme headings | Press Start 2P (`--font-pixel`) | Google Fonts link in `BaseLayout.astro` |

Scale (`globals.css`, all Geist medium):

| Class | Size |
| --- | --- |
| `.h0` | `3xl` → `5xl`, gradient-clipped text (foreground fading to transparent) |
| `h1` / `.h1` | `2xl` → `4xl` |
| `h2` / `.h2` | `xl` → `3xl` |
| `h3` / `.h3` | `lg` → `2xl` |
| `h4` / `.h4` | `base` → `lg` |
| `body` / `.p` | `sm` → `base` |

Layout: `.layout` centers at `42.5rem`, `.layout-wide` at `56.25rem`
(both `w-11/12`); `.section` pads `py-20` → `py-24`; sticky-footer helper
`.min-h-main` is `calc(100vh - 56px)`.

## Themes and toggling

- `<html>` ships with `class="dark"`. An inline pre-paint script in
  `BaseLayout.astro` reads `localStorage.theme` (`light` opts out) and
  `localStorage.pixel-theme` (`pixel` opts in), so there is no theme flash.
  It also re-applies both on `astro:before-swap` for view transitions.
- The Navbar toggle flips the `dark` class and persists to `localStorage`.

### Pixel easter egg (`.pixel`)

 charcoal canvas `#171615`, Minecraft green primary `#3C8527`, grass ring
`#6DC531`, warm neutral surfaces `#262423` / text `#D0C5C0`, radius `2px`,
32px grid background, chunky `4px 4px` offset shadows on panels and cards,
corner-bracket frames hidden, headings/nav/buttons set in Press Start 2P.
Toggled from the bottom-right circle or by typing `rega`; persisted via
`pixel-theme` in `localStorage`. Defined after `.dark` so it wins when both
classes are present.

## TUI component language (`globals.css` + `TuiCard.astro`)

- `.tui-panel` — bordered panel with `.tui-title`: a mono uppercase
  `10px` label interrupting the top border (`┌─ title ──┐`).
- `.tui-home` — scope class: rebinds `--primary` to `--accent-blue` and
  styles `.accent-link` (muted → foreground on hover).
- `.tui-statusbar` — mono `10px` footer row, info left / status right.
- `.corner-card` — the card frame: four `10px` solid corner brackets at
  35% foreground over dotted border edges. `TuiCard.astro` renders the
  eight spans (`corner tl/tr/bl/br`, `edge top/bottom/left/right`) around
  either an `<a>` or an `<article>`.

## Prose and writing pages (`prosemirror.css`)

- `blockquote` — 4px left border with a green→cyan gradient
  (`#00ff94 → #00e0f3 → #00c4fd`); `hr` uses the same gradient at 50%.
- Headings carry `#` hash anchors that appear on hover/focus.
- Code blocks (`pre`) use `--muted` with a 1px border, square corners and
  Geist Mono; syntax highlighting on MDX pages uses Shiki `github-light` /
  `github-dark` as CSS variables, picked by the `.dark` class
  (`astro.config.mjs`), rendered through the `Pre` override component.
- `kbd` — bordered muted keycap in Geist Mono with a 1px bottom shadow.
- `.code-filename-tab` — filename tab above code blocks.
- Links: `a.custom-link` (border-bottom style), `.animated-underline`
  (gradient slide-in), `.flash-underline` (group-hover fill);
  `.cursor-newtab` shows a custom cursor for external links.
- `.focus-me` — consistent `ring-2` focus-visible treatment.

## Motion and chrome

- Keyframes in `tailwind.config.ts`: `spotlight` (hero entrance),
  `gradient` (8s background-position loop), `shimmer` (1.3s sweep),
  `accordion-down/up`.
- `html` uses smooth scrolling with `scroll-padding-top: 56px` (reduced-motion
  respected); prose headings get `scroll-margin-top: 100px`.
- A static film-grain overlay (`body::after` in `globals.css`, SVG noise at
  12% opacity, `pointer-events: none`, hidden in print) covers every page.
- Scrollbars are 6px with border-colored thumbs; text selection is
  `primary/30`.

## File map

| Concern | File |
| --- | --- |
| Tokens, themes, TUI, type scale, utilities | `src/styles/globals.css` |
| Prose, blockquote/hr, anchors, code, kbd | `src/styles/prosemirror.css` |
| Fonts, keyframes, animations, dark `class` mode | `tailwind.config.ts` |
| Dark default, pre-paint theme script, font links | `src/layouts/BaseLayout.astro` |
| Corner-bracket card frame | `src/components/TuiCard.astro` |
| MDX overrides (`pre`, links) | React islands + `Pre` / `CustomLink` |
| Code highlighting theme | Shiki `github-light` / `github-dark` in `astro.config.mjs` |

# Design System

How this portfolio looks and why. Single source of truth for colors,
typography, themes, the TUI component language, and prose styling.

Files: `src/styles/globals.css` (tokens, themes, utilities),
`src/styles/prosemirror.css` (prose/MDX styles),
`tailwind.config.ts` (fonts, animations), `src/layouts/BaseLayout.astro`
(theme bootstrap), `src/components/TuiCard.astro` (card frame).

## Principles

1. **Dark first.** The site boots in Catppuccin Mocha; light (Latte) is opt-in.
2. **Sharp, not round.** Global radius is `0rem` — square panels, buttons, cards.
3. **Type-led hierarchy.** DM Sans for prose/UI, FiraCode Nerd Font for code,
   labels, and status chrome. Pixel font is reserved for the easter-egg theme.
4. **Terminal-flavored chrome.** Panels with titled top borders, corner-bracket
   cards, mono uppercase micro-labels, status bars.

## Color tokens

All colors are `hsl(var(--…))` custom properties. Tailwind maps them 1:1
(`background`, `foreground`, `primary`, `secondary`, `muted`, `accent`,
`popover`, `card`, `border`, `input`, `ring`, plus `destructive`).

### Light — Catppuccin Latte (`:root` in `globals.css`)

| Token | Value | Catppuccin role |
| --- | --- | --- |
| `--background` | `220 23% 95%` | Base |
| `--foreground` | `234 16% 35%` | Text |
| `--card` | `223 24% 92%` | Mantle |
| `--popover` | `220 23% 95%` | Base |
| `--primary` / `--ring` | `266 85% 58%` | Mauve |
| `--primary-foreground` | `220 23% 95%` | Base |
| `--secondary` / `--muted` / `--accent` | `228 22% 83%` | Surface0 |
| `--secondary-foreground` / `--muted-foreground` | `233 14% 48%` | Subtext0 |
| `--accent-foreground` | `234 16% 35%` | Text |
| `--destructive` | `347 87% 44%` | Red |
| `--border` / `--input` | `229 17% 77%` | Surface1 |
| `--radius` | `0rem` | — |

### Dark — Catppuccin Mocha (`.dark`, the default)

| Token | Value | Catppuccin role |
| --- | --- | --- |
| `--background` | `240 21% 15%` | Base |
| `--foreground` | `226 64% 88%` | Text |
| `--card` / `--muted` | `237 16% 23%` | Surface0 |
| `--popover` | `240 21% 12%` | Mantle |
| `--primary` / `--ring` | `267 84% 81%` | Mauve |
| `--primary-foreground` | `240 23% 9%` | Crust |
| `--secondary` / `--accent` | `234 13% 31%` | Surface1 |
| `--secondary-foreground` | `228 24% 72%` | Subtext0 |
| `--muted-foreground` | `230 13% 56%` | Overlay1 |
| `--accent-foreground` | `226 64% 88%` | Text |
| `--destructive` | `343 81% 75%` | Red |
| `--border` | `234 13% 31%` | Surface1 |
| `--input` | `237 16% 23%` | Surface0 |
| `--radius` | `0rem` | — |

### TUI extras (both themes)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--accent-blue` | `220 91% 54%` | `217 92% 76%` | single blue accent, home page only (`.tui-home` rebinds `--primary` to it) |
| `--success` | `114 58% 40%` | `115 54% 76%` | Green status |

## Typography

| Role | Font | Source |
| --- | --- | --- |
| UI / prose (`font-primary`) | DM Sans (`--font-dm-sans`) | Astro font provider (fontsource) in `astro.config.mjs` |
| Code / mono (`font-mono`) | FiraCodeNerdFont | `@font-face` in `globals.css`, files in `public/fonts/` |
| Pixel theme body | Noto Sans (`--font-body`) | Google Fonts link in `BaseLayout.astro` |
| Pixel theme headings | Press Start 2P (`--font-pixel`) | Google Fonts link in `BaseLayout.astro` |

Scale (`globals.css`, all DM Sans medium):

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
  styles `.accent-link` (muted → blue on hover).
- `.tui-statusbar` — mono `10px` footer row, info left / status right.
- `.corner-card` — the card frame: four `10px` solid corner brackets at
  35% foreground over dotted border edges. `TuiCard.astro` renders the
  eight spans (`corner tl/tr/bl/br`, `edge top/bottom/left/right`) around
  either an `<a>` or an `<article>`.

## Prose and writing pages (`prosemirror.css`)

- `blockquote` — 4px left border with a green→cyan gradient
  (`#00ff94 → #00e0f3 → #00c4fd`); `hr` uses the same gradient at 50%.
- Headings carry `#` hash anchors that appear on hover/focus.
- Code blocks (`pre`) are near-black `#0d0d0d` in FiraCode with a fixed
  hljs palette; syntax highlighting on MDX pages uses Shiki `poimandres`
  (`astro.config.mjs`), rendered through the `Pre` override component.
- `kbd` — bordered muted keycap in Nerd Font mono with a 1px bottom shadow.
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
| Code highlighting theme | Shiki `poimandres` in `astro.config.mjs` |

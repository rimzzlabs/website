# AGENTS.md

Personal site for Rizki Citra — Astro (static) with React islands, TypeScript, Tailwind CSS v4, Base UI primitives, Motion for animation, and nanostores for shared state.

This is the canonical guide for agents working in this repo (`CLAUDE.md` points here).

## Commands

Package manager is **pnpm**.

- `pnpm dev` — dev server (`astro dev`)
- `pnpm build` — production build (`astro build`)
- `pnpm check` — TypeScript + Astro type check (`astro check`); run this to verify changes
- `pnpm lint` — Biome lint + format check
- `pnpm format` — Biome autofix (`biome check --write`)
- `pnpm commit` — guided conventional commit (commitizen)

There is no test suite. Verify with `pnpm check`; also `pnpm build` when touching images or build config.

## Stack

- **Astro 7** — static output. Pages in `src/pages`; sections composed from `.astro` files in `src/components/home` + `src/components/shared`.
- **React islands** — anything interactive/stateful is a React component hydrated with a `client:*` directive (`client:idle`, `client:visible`, `client:only="react"`).
- **TypeScript** — path alias `@/* → src/*`.
- **Tailwind v4** — no config file; design tokens and the `.dark` theme live in `src/styles/global.css`. Compose classes with `cn()` from `@/lib/utils`.
- **Base UI** (`@base-ui/react`) — headless primitives behind everything in `src/components/ui` (shadcn "base-vega" style).
- **Motion** (`motion/react`) — all animation.
- **nanostores** (+ `@nanostores/persistent`) — shared, persisted client state.

## Structure

- `src/pages` — Astro pages.
- `src/components/home` — page sections (`hero`, `experience`, `skill`, `archive`); complex sections get a folder (e.g. `archive/`).
- `src/components/shared` — layout + cross-page pieces (`app-layout`, `footer`, `dock/`).
- `src/components/ui` — Base UI primitives (accordion, button, dropdown-menu, tooltip, drawer, alert-dialog, carousel).
- `src/hooks` — all React hooks.
- `src/lib/stores` — nanostores atoms only.
- `src/lib` — `utils.ts` (`cn`), `motion.ts` (shared transitions).
- `src/assets` — images imported by components; `public/` — static files.

## Conventions

### Code structure

- **Hooks live in `src/hooks`** — every `use*` hook, one per `use-*.ts` file.
- **Stores hold only atoms** — files in `src/lib/stores` export nanostores atoms (and small type guards) only. The hooks that read them live in `src/hooks` (e.g. `$theme` in `stores/theme.ts`; `useTheme`/`useThemeSync` in `hooks/use-theme.ts`).
- **No barrel `index` files** — a folder's entry is `folder/folder.tsx` (e.g. `dock/dock.tsx`, `archive/archive-timeline.tsx`), imported as `./dock/dock`.
- **Naming** — kebab-case files with a domain prefix (`dock-bar`, `dock-menu-preference`, `archive-photos`); the exported component name mirrors the filename (`DockBar`, `DockMenuPreference`, `ArchivePhotos`).
- **One concern per file** — split large components into a folder (see `dock/`, `archive/`).

### Style

- **Use named function declarations, not arrow consts** — write `function foo() {}` / `export function foo() {}`, never `export const foo = () => {}`, for module-level functions, components, hooks, and helpers. Arrow functions are only for callbacks *inside* a component (event handlers, `map`/`filter`, props like `onClick={() => …}`).
- **Named exports only** — never `export default` a React island/component or a utility function; export by name (matching the filename). (`.astro` files are the exception — they default-export by nature.)
- **Components are exported `function` declarations**; destructure props in the signature. Type props inline for small components (`function DockLink({ href }: { href: string })`); use a named `type`/`interface` when the shape is larger or shared, co-located and exported (e.g. `export type Photo`).
- **Handlers are nested `function handleX(...)`** inside the component; use early returns for guards (`if (open) return null`).
- **Lift configuration to module scope** as typed constants — `Record<…>` lookup maps, shared class strings (`POSITION_CLASS`, `itemClass`), variant objects, and `useSyncExternalStore` `subscribe`/`getSnapshot` (see `use-is-mobile.ts`). Keep render bodies declarative.
- **Build class names with `cn()`**; long Tailwind lists on a single attribute are fine.
- **Indentation:** `.ts`/`.tsx` use tabs (Biome); **`.astro` files use 2 spaces** — Biome and lint-staged don't touch `.astro`, so match the existing files by hand.
- **Astro frontmatter:** external imports before relative ones; declare page data as `const` arrays of plain objects at the top; render lists with `{ items.map((item) => (…)) }`.
- **`lib` stays small and pure:** `stores/*` export atoms + types only; `motion.ts` exports shared `Transition`s; `utils.ts` exports helpers like `cn`.

### Comments

- **Comment sparingly.** The code should read on its own — never narrate obvious lines or restate what the JSX already says.
- **Only annotate genuinely non-obvious logic** — tricky algorithms or math, subtle workarounds, or *why* something deviates from the obvious. Prefer a short `//` on the reason over a paragraph.

### UI & animation

- Build UI on **Base UI**; add primitives with `pnpm dlx shadcn add <name>` (style is `base-vega`). Decline overwrites of customized files like `button.tsx`.
- **All animation uses `motion/react` and must respect the motion preference.** Gate with `useMotionEnabled()` (`@/hooks/use-motion`) and use `SPRING` when enabled / `INSTANT` when not (`@/lib/motion`) — this combines the user's stored choice with OS `prefers-reduced-motion`. Library popups (drawer, alert-dialog) are gated the same way (animations disabled via class overrides when motion is off).
- Tailwind v4 utilities only. Theme is the `.dark` class, applied before paint by an inline script in `app-layout.astro` and kept in sync by `useThemeSync`.

### Workflow

- **Biome** formats and lints: tabs, line width 100, double quotes, organized imports. Run `pnpm format` before committing; the Husky pre-commit hook runs `biome check --write` on staged files via lint-staged.
- **Conventional commits**, enforced by commitlint. Use `pnpm commit` (commitizen) or write `type(scope): subject` directly.
- **Never commit or push to `main` directly** — branch off `main`, push the branch, and open a PR into `main`. Integrate locally by **rebasing** (keep history linear, no merge commits); **squash-merge** the PR on the remote.
- Commit and push only when asked.

## Gotchas

- **`.astro/` is generated and gitignored** — never commit it.
- **`astro:assets` `<Image>` works only in `.astro` files**, not React islands. Inside React use a plain `<img>` (with `width`/`height`); import images as metadata (`import img from "@/assets/x.webp"` → `{ src, width, height }`).
- **Remote-image builds need Sharp** — `<Image>`/`getImage` over the thesvg CDN requires Sharp, whose build script pnpm skips by default. Enable it with `pnpm approve-builds` (select `sharp`) or `pnpm build` will fail.

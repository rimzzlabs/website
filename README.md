# rimzzlabs.com

Personal site of **Rizki Citra**. Live at [rimzzlabs.com](https://rimzzlabs.com).

A fully static [Astro](https://astro.build) site with React islands, deployed on **Cloudflare Pages**. A thin layer of Pages Functions adds the dynamic parts: locale negotiation, a guestbook backed by D1, OAuth sign-in, and a contact form — without pulling in an SSR adapter.

## Features

- **Bilingual (en/id)** — every page exists in English and Indonesian. Root requests are redirected by an edge middleware using a `locale` cookie or `Accept-Language`; everything else is prerendered per locale.
- **Notes** — MDX blog posts per locale with Shiki syntax highlighting, slugged headings, a table of contents with reading progress, and an edge "did you mean…?" fuzzy router for near-miss URLs (with locale-aware branded 404s).
- **Guestbook** — anonymous or OAuth-verified (GitHub / Google via [better-auth](https://better-auth.com)) comments stored in Cloudflare D1, protected by Turnstile. Recent comments are baked into the static HTML at build time (crawlable) with client-side fetching as fallback.
- **Contact form** — rich-text (Tiptap) dialog delivered via [Resend](https://resend.com), Turnstile-protected.
- **Now / Archive pages** — what I'm up to, plus a photo timeline with carousels.
- **Polish** — light/dark theme applied before paint, animations via Motion that respect `prefers-reduced-motion` and a stored user preference, draggable dock navigation, image sitemap, SEO/OG tags.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7 (static output) + React 19 islands |
| Styling | Tailwind CSS v4, Base UI primitives (shadcn `base-vega` style), Motion |
| State | nanostores (+ persistent), TanStack Query for server data |
| Forms | react-hook-form + zod |
| Content | Astro content collections (MDX), Shiki, rehype-slug / rehype-autolink-headings via `unified()` |
| Backend | Cloudflare Pages Functions, D1 (guestbook), better-auth, Resend, Turnstile |
| Tooling | TypeScript, Biome, Husky + lint-staged, commitlint (conventional commits), pnpm |

## Getting started

Prerequisites: **Node 22.12** (see `.nvmrc`) and **pnpm**.

```sh
pnpm install
pnpm approve-builds   # select `sharp` — needed for remote-image builds
cp .env.example .env  # fill in values (see comments in the file)
pnpm dev
```

`.env` only holds build-time values: the public Turnstile site key, and optional Cloudflare credentials to bake guestbook comments into the static HTML. Everything is documented inline in [.env.example](.env.example).

### Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server (`astro sync && astro dev`) |
| `pnpm build` | Production build (applies remote D1 migrations first) |
| `pnpm preview` | Preview the built site |
| `pnpm check` | TypeScript + Astro type check |
| `pnpm lint` / `pnpm format` | Biome check / autofix |
| `pnpm commit` | Guided conventional commit (commitizen) |
| `pnpm guestbook:migrate` | Apply D1 migrations locally |
| `pnpm guestbook:preview` | Full local run with Pages Functions: local D1 migrations → build → `wrangler pages dev dist` |

There is no test suite — verify changes with `pnpm check`, and `pnpm build` when touching images or build config.

### Running the guestbook locally

`astro dev` serves the static site only; the API lives in Pages Functions. To exercise the guestbook, auth, or contact endpoints locally, use:

```sh
pnpm guestbook:preview
```

which builds the site and serves `dist/` through `wrangler pages dev` with a local D1 database (schema in [migrations/](migrations/)).

## Architecture

```
src/pages            Astro pages (mirrored under src/pages/id for Indonesian)
src/components       home sections, notes, now, shared layout/dock, Base UI primitives
src/content/notes    MDX posts, one folder per locale (en/, id/)
src/i18n             locale config + dictionaries
src/hooks            all React hooks
src/lib              utils, motion transitions, nanostores atoms, guestbook client/build helpers
functions            Cloudflare Pages Functions (the only per-request code)
  _middleware.ts       root locale redirect + locale-aware 404s
  notes/, id/notes/    fuzzy slug router for notes URLs
  api/guestbook*       guestbook CRUD on D1
  api/auth/[[all]]     better-auth handler (GitHub / Google OAuth)
  api/contact.ts       contact form → Resend
migrations           D1 schema for the guestbook
wrangler.jsonc       Pages + D1 configuration
```

Runtime secrets (Turnstile secret, OAuth client ids/secrets, Resend key, session secret, notification emails) are set on the Cloudflare Pages project, not in `.env` — grep `env.` in [functions/](functions/) for the full list.

## Contributing / conventions

Code style, naming, and workflow conventions live in [AGENTS.md](./AGENTS.md) — the single source of truth for working in this repo (tabs via Biome, named function declarations, no barrel files, conventional commits, PRs into `main` with squash-merge).

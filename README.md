# rimzzlabs.com

The source code of rimzzlabs.com. The site has notes, a guestbook, a /now page, an archive, and a contact form, in English and Indonesian.

The site is static. Astro builds every page at build time, and React islands add the interactive parts. A small set of Cloudflare Pages Functions runs the forms, the guestbook, and the sign-in.

## Stack

- [Astro](https://astro.build) 7 with React islands, MDX, and Tailwind CSS 4.
- [Cloudflare Pages](https://pages.cloudflare.com) for hosting, with Pages Functions in `functions/`.
- [Cloudflare D1](https://developers.cloudflare.com/d1/) for the guestbook, and [better-auth](https://www.better-auth.com) for GitHub sign-in.
- [Resend](https://resend.com) and [React Email](https://react.email) for the email notifications.
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) for spam protection on the forms.

## Fork this site

You can fork this repository and use it as a base for your own site. The notes, the archive, the photos, and the portrait are personal content. Replace them before you publish.

- Notes: `src/content/notes/en` and `src/content/notes/id`
- Legal pages: `src/content/legal`
- Archive, gallery, and /now data: `src/data`
- Text for each language: `src/i18n/en.ts` and `src/i18n/id.ts`

## Requirements

- Node.js 22.12 or later
- pnpm 10
- A Cloudflare account. The free plan is sufficient.
- A GitHub account, for the guestbook sign-in

## Install

1. Clone the repository.
2. Run `pnpm install`.
3. Copy `.env.example` to `.env`.
4. Copy `.dev.vars.example` to `.dev.vars`.

The site uses two files for variables:

| File        | Read by                          | Contents                                                             |
| ----------- | -------------------------------- | -------------------------------------------------------------------- |
| `.env`      | Astro, at build time             | The Turnstile site key, and the D1 access for the guestbook snapshot |
| `.dev.vars` | The Pages Functions, at run time | The API keys and the secrets for the forms and the sign-in           |

Each example file has a comment for every variable. Both files stay out of Git.

## Run the development server

1. Run `pnpm dev`.
2. Open `http://localhost:5600`.

The `pnpm dev` command starts two servers:

- Astro on port 5600, for the pages
- Wrangler on port 8788, for the Pages Functions

Astro sends every `/api` request to Wrangler. Wrangler reloads the Functions when you save a file.

For local tests, you can use the Turnstile test keys in the example files. The test keys always pass.

To preview the emails, run `pnpm email:dev`. Then open `http://localhost:5601`.

## Guestbook

The guestbook stores its entries in a D1 database. Visitors can sign in with GitHub, or write anonymously.

### Create the database

1. Run `pnpm wrangler login`.
2. Run `pnpm wrangler d1 create guestbook`.
3. Copy the `database_id` from the output into `wrangler.jsonc`.
4. Run `pnpm guestbook:migrate` to create the tables in the local database.
5. Run `pnpm guestbook:migrate:remote` to create the tables in the production database.

The migrations are in `migrations/`. Run both commands again when you add a migration.

### Create the GitHub OAuth apps

You need two OAuth apps: one for local development and one for production. Create them in GitHub, under Settings > Developer settings > OAuth Apps.

| App        | Homepage URL              | Authorization callback URL                         |
| ---------- | ------------------------- | -------------------------------------------------- |
| Local      | `http://localhost:5600`   | `http://localhost:5600/api/auth/callback/github`   |
| Production | `https://your-domain.com` | `https://your-domain.com/api/auth/callback/github` |

Put the client ID and the client secret of the local app in `.dev.vars`. Keep the production values for the Cloudflare step below.

Make sure that you open the local site at `http://localhost:5600`. If you use `127.0.0.1` or a network address, GitHub rejects the callback.

### Guestbook snapshot

The build reads the newest entries through the D1 REST API and writes them into the page. Thus, the first entries show before JavaScript loads. This step is optional. If `CLOUDFLARE_ACCOUNT_ID` or `CLOUDFLARE_API_TOKEN` is empty, the page loads the entries in the browser.

1. Create an API token with the "D1 Read" permission at https://dash.cloudflare.com/profile/api-tokens.
2. Put your account ID and the token in `.env`.

## Deploy to Cloudflare Pages

### Create the project

1. In the Cloudflare dashboard, go to Workers & Pages.
2. Create a Pages project, and connect it to your fork on GitHub.
3. Set the build command to `pnpm build`.
4. Set the build output directory to `dist`.
5. Set the project name to the `name` value in `wrangler.jsonc`.

Cloudflare reads the D1 binding and the compatibility flags from `wrangler.jsonc`. The site needs the `nodejs_compat` flag for better-auth.

If the build fails on an old Node.js version, set the `NODE_VERSION` variable to `22`.

### Set the variables and secrets

Set these values in the Pages project, under Settings > Variables and Secrets. Use the production values, not the local values.

| Name                           | Type     | Used for                                                         |
| ------------------------------ | -------- | ---------------------------------------------------------------- |
| `PUBLIC_CF_TURNSTILE_SITE_KEY` | Variable | Turnstile widget, at build time                                  |
| `CLOUDFLARE_ACCOUNT_ID`        | Variable | Guestbook snapshot, at build time                                |
| `CLOUDFLARE_API_TOKEN`         | Secret   | Guestbook snapshot, at build time                                |
| `CF_TURNSTILE_SECRET_KEY`      | Secret   | Turnstile check in the Functions                                 |
| `RESEND_API_KEY`               | Secret   | Email notifications                                              |
| `CONTACT_FROM`                 | Variable | Sender address, on a domain that you verified in Resend          |
| `CONTACT_TO`                   | Variable | Your inbox                                                       |
| `SESSION_SECRET`               | Secret   | better-auth sessions. Run `openssl rand -base64 48` to make one. |
| `GITHUB_CLIENT_ID`             | Variable | Production GitHub OAuth app                                      |
| `GITHUB_CLIENT_SECRET`         | Secret   | Production GitHub OAuth app                                      |
| `PAGES_DEPLOY_HOOK_URL`        | Secret   | Guestbook rebuild. This value is optional.                       |

You can also set a secret from the terminal. Run this command, then paste the value:

```sh
pnpm wrangler pages secret put RESEND_API_KEY --project-name your-project
```

### Rebuild after new guestbook entries

The guestbook page is static, so a new entry shows in the snapshot only after a rebuild. The site can start this rebuild for you.

1. In the Pages project, go to Settings > Builds > Deploy hooks.
2. Create a deploy hook for your production branch.
3. Set the hook URL as `PAGES_DEPLOY_HOOK_URL`.

After a new entry, the guestbook Function calls the hook. It calls the hook one time per minute at most.

## Commands

| Command                         | Action                                                  |
| ------------------------------- | ------------------------------------------------------- |
| `pnpm dev`                      | Starts Astro and the Pages Functions                    |
| `pnpm build`                    | Builds the site into `dist/`                            |
| `pnpm preview:functions`        | Builds the site, then serves `dist/` with the Functions |
| `pnpm guestbook:migrate`        | Applies the migrations to the local D1 database         |
| `pnpm guestbook:migrate:remote` | Applies the migrations to the production D1 database    |
| `pnpm email:dev`                | Starts the email preview on port 5601                   |

Git hooks run Biome and Prettier before each commit, and commitlint on each commit message. The TypeScript check runs before each push.

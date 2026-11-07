# Rimzzlabs Presence

A Raycast menu-bar command that controls the online status on rimzzlabs.com.

- Click the menu-bar icon to go online or offline.
- While the status is on, Raycast sends a ping every 2 minutes.
- If the pings stop for 5 minutes (sleep, no network, Raycast quit), the site shows "Last active".

## Set up

Run these commands from the repository root.

1. Make a token: `openssl rand -hex 32`.
2. Add it to Cloudflare: `pnpm wrangler pages secret put PRESENCE_TOKEN --env-file /dev/null`.
3. Apply the migration: `pnpm wrangler d1 migrations apply guestbook --remote --env-file /dev/null`.
4. Install the extension: `pnpm install`, then `pnpm --filter rimzzlabs-presence dev`.
5. In Raycast, paste the token into the "Presence Token" preference.

The `--env-file /dev/null` flag stops Wrangler from reading `.env`. The `CLOUDFLARE_API_TOKEN` in `.env` has no Pages or D1 access, so Wrangler must use your `wrangler login` session.

After the dev command starts, the command stays in Raycast. You can stop the dev process.

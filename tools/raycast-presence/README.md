# Rimzzlabs Presence

A Raycast menu-bar command that controls the online status on rimzzlabs.com.

- Click the menu-bar icon to go online or offline.
- While the status is on, Raycast sends a ping every 2 minutes.
- If the pings stop for 5 minutes (sleep, no network, Raycast quit), the site shows "Last active".

## Set up

1. Make a token: `openssl rand -hex 32`.
2. Add it to Cloudflare: `pnpm wrangler pages secret put PRESENCE_TOKEN`.
3. Apply the migration: `pnpm guestbook:migrate:remote`.
4. Install the extension: `cd tools/raycast-presence && npm install && npm run dev`.
5. In Raycast, paste the token into the "Presence Token" preference.

After `npm run dev`, the command stays in Raycast. You can stop the dev process.

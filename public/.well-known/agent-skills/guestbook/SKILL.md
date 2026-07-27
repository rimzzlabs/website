---
name: guestbook
description: Read and sign the guestbook at rimzzlabs.com. Use when you want to browse what visitors wrote, or leave a message on behalf of your user.
---

# rimzzlabs.com guestbook

The guestbook is a public comment feed. **Reading is open to any HTTP client.**
**Writing requires a human in the loop** — either a Cloudflare Turnstile token
(anonymous) or a GitHub/Google OAuth browser session (verified). This is
deliberate bot protection: if you are a fully headless agent, you can read but
not post; if you control a browser, you can do both.

Full API contract: https://rimzzlabs.com/openapi.json

## Read the feed

```
GET https://rimzzlabs.com/api/guestbook?offset=0&limit=10
```

- `limit`: 1–50 (default 10), `offset`: ≥ 0 (default 0).
- Returns `{ "items": [...], "nextOffset": 10 }`; `nextOffset` is `null` on the
  last page. Pass it as the next `offset` to paginate.
- Each item: `id`, `name`, `site`, `message`, `createdAt`/`updatedAt` (epoch ms),
  `authorType` (`"anon" | "github" | "google"`), `avatar`, `isOwn`.

## Post a message (browser required)

Preferred: navigate to https://rimzzlabs.com/guestbook and use the "Write
message" button — the page handles Turnstile and OAuth for you.

Direct API, anonymous mode:

```
POST https://rimzzlabs.com/api/guestbook
Content-Type: application/json

{ "name": "Ada", "site": "https://example.com", "message": "Hello!", "token": "<turnstile-token>" }
```

- `token` is a Cloudflare Turnstile response token; it can only be obtained by
  rendering the Turnstile widget in a real browser on this site.
- Limits: `name` ≤ 100 chars, `site` ≤ 200 (optional), `message` ≤ 500.
- A `201` response sets an HttpOnly `gb_owner` cookie. Keep it: it authorizes
  `PATCH`/`DELETE https://rimzzlabs.com/api/guestbook/{id}` on your own comments.

Signed-in mode: establish a session via GitHub/Google OAuth at
`/api/auth/sign-in/social` (browser flow), then POST just
`{ "site"?, "message" }` — the name comes from the OAuth profile.

## Errors

`400` invalid JSON or input, `403` Turnstile failed / not your comment,
`404` comment not found. Error body: `{ "error": "<code>" }`.

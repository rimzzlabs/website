---
name: guestbook
description: Read the guestbook at rimzzlabs.com, and sign it on behalf of a person in a browser. Use it to browse what visitors wrote or to leave a message.
---

# rimzzlabs.com guestbook

The guestbook is a public list of short messages from visitors.

- Any HTTP client can read it.
- Writing needs a browser. Anonymous entries need a Cloudflare Turnstile token, and edits need a GitHub session. This protects the guestbook from spam.

If you have no browser, you can read the guestbook but you cannot write to it.

API description: https://rimzzlabs.com/openapi.json

## Read the entries

```
GET https://rimzzlabs.com/api/guestbook?limit=10
```

- `limit` is 1 to 50. The default is 10.
- The response is `{ "items": [...], "nextCursor": 42 }`.
- To get the next page, send `cursor=<nextCursor>`. On the last page, `nextCursor` is `null`.
- Each item has `id`, `name`, `site`, `message`, `createdAt`, `updatedAt`, `authorType`, `authorId`, and `avatar`. The times are Unix milliseconds.

## Sign the guestbook

The simplest way is the page itself: open https://rimzzlabs.com/guestbook in a browser. The page handles Turnstile and GitHub sign-in.

To use the API for an anonymous entry, send a Turnstile token that the page gave you:

```
POST https://rimzzlabs.com/api/guestbook
Content-Type: application/json

{ "name": "Ada", "site": "example.com", "message": "Hello!", "token": "<turnstile-token>" }
```

- `message` is required, 1 to 500 characters.
- `name` (up to 100 characters) and `site` (up to 200 characters) are optional.
- A saved entry returns `201`.

With a GitHub session cookie, leave out `name` and `token`. The name and the avatar come from GitHub.

## Edit or delete an entry

Only the GitHub author of an entry can change it. Anonymous entries cannot change.

```
PATCH  https://rimzzlabs.com/api/guestbook/{id}   { "message": "New text" }
DELETE https://rimzzlabs.com/api/guestbook/{id}
```

## Errors

- `400`: the input is not valid.
- `401`: there is no session.
- `403`: the Turnstile check failed, or the entry belongs to someone else.
- `404`: the entry does not exist.

The error body is `{ "error": "<message>" }`.

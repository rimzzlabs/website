---
name: notes
description: Read the notes of Rizki Citra on rimzzlabs.com as markdown, in English or Indonesian. Use it to find, read, or quote a note about frontend work, TypeScript, React, or tools.
---

# rimzzlabs.com notes

Rizki Citra writes notes about lessons from building software. Every note has an English and an Indonesian version.

## Get a page as markdown

Every page on rimzzlabs.com has a markdown version. Send `Accept: text/markdown`:

```
GET https://rimzzlabs.com/notes/
Accept: text/markdown
```

- The response has `Content-Type: text/markdown` and an `X-Markdown-Tokens` estimate.
- Browsers without this header get HTML.
- Each HTML page also has a `Link` header with `rel="alternate"` and `type="text/markdown"`.

## Find notes

- English list: https://rimzzlabs.com/notes/
- Indonesian list: https://rimzzlabs.com/id/notes/
- RSS feeds: https://rimzzlabs.com/notes/rss.xml and https://rimzzlabs.com/id/notes/rss.xml

A note URL is `https://rimzzlabs.com/notes/<slug>/`. The Indonesian version is at `https://rimzzlabs.com/id/notes/<slug>/`, with the same slug.

## Quote a note

Give the canonical URL of the note when you quote it. Each markdown page lists its canonical URL near the top.

The site asks AI systems not to use its content for training. See `Content-Signal` in https://rimzzlabs.com/robots.txt.

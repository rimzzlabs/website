// Cloudflare Pages Function owning every request under `/notes/*`. The site is static,
// so this is where unknown-slug handling runs per-request — it deliberately takes over
// from the global 404 (see the `/notes/` guard in functions/_middleware.ts):
//   - empty slug (`/notes`, `/notes/`)        -> fall through to the static index page
//   - exact canonical slug                    -> fall through to the static note page
//   - exact slug, different case              -> 308 redirect to the canonical URL
//   - close slug within the fuzzy threshold   -> "Did you mean …?" page, HTTP 404
//   - no close slug                           -> "Note not found." page, HTTP 404

interface NoteEntry {
	slug: string;
	title: string;
}

interface PagesContext {
	request: Request;
	next: (input?: Request | string) => Promise<Response>;
	env: { ASSETS: { fetch: (input: Request | string) => Promise<Response> } };
}

/** Levenshtein edit distance, classic two-row dynamic-programming variant. */
function editDistance(a: string, b: string): number {
	if (a === b) return 0;
	if (!a.length) return b.length;
	if (!b.length) return a.length;

	let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
	let curr = new Array<number>(b.length + 1);

	for (let i = 1; i <= a.length; i++) {
		curr[0] = i;
		for (let j = 1; j <= b.length; j++) {
			const cost = a[i - 1] === b[j - 1] ? 0 : 1;
			curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
		}
		[prev, curr] = [curr, prev];
	}
	return prev[b.length];
}

/** Closest entry by edit distance, or null when nothing is within `max(3, slug.length * 0.4)`. */
function closestNote(slug: string, notes: Array<NoteEntry>): NoteEntry | null {
	const threshold = Math.max(3, slug.length * 0.4);
	let best: NoteEntry | null = null;
	let bestDistance = Number.POSITIVE_INFINITY;

	for (const note of notes) {
		const distance = editDistance(slug.toLowerCase(), note.slug.toLowerCase());
		if (distance < bestDistance) {
			best = note;
			bestDistance = distance;
		}
	}

	return bestDistance <= threshold ? best : null;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function renderPage(heading: string, body: string): string {
	return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="robots" content="noindex" />
		<title>${escapeHtml(heading)}</title>
		<style>
			:root { color-scheme: light dark; }
			body {
				margin: 0; min-height: 100dvh; display: grid; place-items: center;
				font-family: ui-sans-serif, system-ui, sans-serif; line-height: 1.5;
				background: #fff; color: #18181b; padding: 2rem; text-align: center;
			}
			@media (prefers-color-scheme: dark) { body { background: #09090b; color: #fafafa; } }
			a { color: inherit; text-underline-offset: 3px; }
			main { max-width: 32rem; }
		</style>
	</head>
	<body><main>${body}</main></body>
</html>`;
}

function notFoundResponse(html: string): Response {
	return new Response(html, {
		status: 404,
		headers: { "content-type": "text/html; charset=utf-8" },
	});
}

export async function onRequest(context: PagesContext): Promise<Response> {
	const { request, next, env } = context;
	const url = new URL(request.url);

	// Decoded slug, trailing slash stripped: `/notes/foo-bar/` -> `foo-bar`.
	const slug = decodeURIComponent(url.pathname.replace(/^\/notes\/?/, "").replace(/\/$/, ""));

	// `/notes` and `/notes/` are the static index page — let the assets serve it.
	if (!slug) return next();

	const indexResponse = await env.ASSETS.fetch(new URL("/notes-index.json", url).toString());
	const notes = (await indexResponse.json()) as Array<NoteEntry>;

	const exact = notes.find((note) => note.slug === slug);
	if (exact) return next();

	const caseMatch = notes.find((note) => note.slug.toLowerCase() === slug.toLowerCase());
	if (caseMatch) {
		return new Response(null, {
			status: 308,
			headers: { location: `/notes/${caseMatch.slug}` },
		});
	}

	const suggestion = closestNote(slug, notes);
	if (suggestion) {
		const href = `/notes/${encodeURI(suggestion.slug)}`;
		return notFoundResponse(
			renderPage(
				"Did you mean…?",
				`<h1>Did you mean <a href="${escapeHtml(href)}">${escapeHtml(suggestion.title)}</a>?</h1>`,
			),
		);
	}

	return notFoundResponse(renderPage("Note not found", "<h1>Note not found.</h1>"));
}

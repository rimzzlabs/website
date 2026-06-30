// Shared logic for the per-locale `/notes/*` edge functions. The `_lib` directory
// is underscore-prefixed, so Cloudflare Pages does not turn it into a route. Each
// locale's function (functions/notes/[[slug]].ts, functions/id/notes/[[slug]].ts)
// passes its NotesRouterConfig. Per-request handling, taking over from the global
// 404 (see the matching guard in functions/_middleware.ts):
//   - empty slug (`/notes`, `/notes/`)        -> fall through to the static index page
//   - exact canonical slug                    -> fall through to the static note page
//   - exact slug, different case              -> 308 redirect to the canonical URL
//   - close slug within the fuzzy threshold   -> not-found page with a "did you mean…?" link
//   - no close slug                           -> not-found page, no suggestion
// Both miss cases serve the prerendered, branded not-found page with HTTP 404.

interface NoteEntry {
	slug: string;
	title: string;
}

export interface NotesRouterConfig {
	/** Path prefix this function owns, e.g. `/notes` or `/id/notes`. */
	basePath: string;
	/** Asset path of the prerendered search index for this locale. */
	indexPath: string;
	/** Asset path of the prerendered not-found page (index.html) for this locale. */
	notFoundPath: string;
}

export interface PagesContext {
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

/**
 * Serve the prerendered branded not-found page with HTTP 404. When a suggestion
 * exists, reveal its paragraph (drop the `hidden` attribute) and fill the tokens
 * the Astro page left for us; all styling stays in the page.
 */
async function notFoundResponse(
	context: PagesContext,
	config: NotesRouterConfig,
	url: URL,
	suggestion: NoteEntry | null,
): Promise<Response> {
	const page = await context.env.ASSETS.fetch(new URL(config.notFoundPath, url).toString());
	let html = await page.text();

	if (suggestion) {
		const href = `${config.basePath}/${encodeURI(suggestion.slug)}`;
		html = html
			.replace("data-suggestion hidden", "data-suggestion")
			.replace("__SUGGESTION_HREF__", escapeHtml(href))
			.replace("__SUGGESTION_TITLE__", escapeHtml(suggestion.title));
	}

	return new Response(html, {
		status: 404,
		headers: { "content-type": "text/html; charset=utf-8" },
	});
}

export async function handleNotesRequest(
	context: PagesContext,
	config: NotesRouterConfig,
): Promise<Response> {
	const { request, next, env } = context;
	const url = new URL(request.url);

	// Decoded slug, base prefix and trailing slash stripped: `/notes/foo-bar/` -> `foo-bar`.
	const prefix = new RegExp(`^${config.basePath}/?`);
	const slug = decodeURIComponent(url.pathname.replace(prefix, "").replace(/\/$/, ""));

	// The bare prefix (`/notes`, `/notes/`) is the static index page — let the assets serve it.
	if (!slug) return next();

	const indexResponse = await env.ASSETS.fetch(new URL(config.indexPath, url).toString());
	const notes = (await indexResponse.json()) as Array<NoteEntry>;

	const exact = notes.find((note) => note.slug === slug);
	if (exact) return next();

	const caseMatch = notes.find((note) => note.slug.toLowerCase() === slug.toLowerCase());
	if (caseMatch) {
		return new Response(null, {
			status: 308,
			headers: { location: `${config.basePath}/${caseMatch.slug}` },
		});
	}

	return notFoundResponse(context, config, url, closestNote(slug, notes));
}

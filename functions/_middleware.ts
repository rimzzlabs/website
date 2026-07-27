// Cloudflare Pages middleware. The site is fully static; this is the only piece
// that runs per-request. It does three things:
//   1. Root-only language detection — redirect `/` to `/id` based on a `locale`
//      cookie, falling back to `Accept-Language`, defaulting to English.
//   2. Markdown for agents — serve the prebuilt /md/* variant of a page when the
//      request prefers `Accept: text/markdown`.
//   3. Locale-aware 404s — serve the `/id` not-found page for misses under `/id`.

type Locale = "en" | "id";

interface MiddlewareContext {
	request: Request;
	next: (input?: Request | string) => Promise<Response>;
	env: { ASSETS: { fetch: (input: Request | string) => Promise<Response> } };
}

const COOKIE_RE = /(?:^|;\s*)locale=(en|id)(?:;|$)/;

/** Highest-priority language whose base subtag is `id` or `en`; defaults to English. */
function detectLang(header: string | null): Locale {
	if (!header) return "en";
	const ranked = header
		.split(",")
		.map((part) => {
			const [tag, q] = part.trim().split(";q=");
			const weight = Number(q);
			return { base: tag.toLowerCase().split("-")[0], q: Number.isFinite(weight) ? weight : 1 };
		})
		.sort((a, b) => b.q - a.q);

	for (const { base } of ranked) {
		if (base === "id") return "id";
		if (base === "en") return "en";
	}
	return "en";
}

/** Explicit cookie choice wins over the header. */
function readLocale(request: Request): Locale {
	const match = request.headers.get("cookie")?.match(COOKIE_RE);
	if (match) return match[1] as Locale;
	return detectLang(request.headers.get("accept-language"));
}

/**
 * Markdown variants live under /md/* (built by src/pages/md), mirroring the page
 * tree: `/` → /md/index.md, `/notes/x` → /md/notes/x.md. Outside /notes so the
 * fuzzy-router functions never see them.
 */
function markdownCandidates(pathname: string): Array<string> {
	const clean = pathname.replace(/\/+$/, "");
	const candidates = [];
	if (clean) candidates.push(`/md${clean}.md`);
	candidates.push(`/md${clean}/index.md`);
	return candidates;
}

// Probe with ASSETS.fetch, never next(url): a middleware next(url) *rewrites*
// the in-flight request for the rest of the chain, so a missed probe would leak
// into the real response.
async function serveMarkdown(
	url: URL,
	assets: MiddlewareContext["env"]["ASSETS"],
): Promise<Response | null> {
	for (const candidate of markdownCandidates(url.pathname)) {
		const asset = await assets.fetch(new URL(candidate, url).toString());
		if (asset.status !== 200) continue;
		const text = await asset.text();
		return new Response(text, {
			headers: {
				"content-type": "text/markdown; charset=utf-8",
				vary: "accept",
				"x-markdown-tokens": String(Math.ceil(text.length / 4)),
			},
		});
	}
	return null;
}

export async function onRequest(context: MiddlewareContext): Promise<Response> {
	const { request, next, env } = context;
	const url = new URL(request.url);

	if (url.pathname === "/" && readLocale(request) === "id") {
		return new Response(null, { status: 302, headers: { Location: "/id" } });
	}

	// Markdown for agents: prefer the prebuilt markdown variant when the client
	// asks for it. Pages that have no variant fall through to HTML.
	const wantsMarkdown =
		request.method === "GET" &&
		request.headers.get("accept")?.includes("text/markdown") &&
		!url.pathname.startsWith("/md/");
	if (wantsMarkdown) {
		const markdown = await serveMarkdown(url, env.ASSETS);
		if (markdown) return markdown;
	}

	const response = await next();

	const wantsHtml = request.headers.get("accept")?.includes("text/html");
	// `/notes/*` and `/id/notes/*` 404s are owned by the per-locale note functions
	// (functions/notes + functions/id/notes — the branded "did you mean" page);
	// don't replace them with the global 404.
	const isNotesRoute = url.pathname.startsWith("/notes/") || url.pathname.startsWith("/id/notes/");
	if (response.status === 404 && wantsHtml && !isNotesRoute) {
		// Astro emits the root 404 as `/404.html` but localized pages use the directory
		// format, so the Indonesian 404 lives at `/id/404/index.html`.
		const isId = url.pathname === "/id" || url.pathname.startsWith("/id/");
		const fallback = await next(new URL(isId ? "/id/404/index.html" : "/404.html", url).toString());
		return new Response(fallback.body, { status: 404, headers: fallback.headers });
	}

	return response;
}

// Cloudflare Pages middleware. The site is fully static; this is the only piece
// that runs per-request. It does two things:
//   1. Root-only language detection — redirect `/` to `/id` based on a `locale`
//      cookie, falling back to `Accept-Language`, defaulting to English.
//   2. Locale-aware 404s — serve the `/id` not-found page for misses under `/id`.

type Locale = "en" | "id";

interface MiddlewareContext {
	request: Request;
	next: (input?: Request | string) => Promise<Response>;
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

export async function onRequest(context: MiddlewareContext): Promise<Response> {
	const { request, next } = context;
	const url = new URL(request.url);

	if (url.pathname === "/" && readLocale(request) === "id") {
		return new Response(null, { status: 302, headers: { Location: "/id" } });
	}

	const response = await next();

	const wantsHtml = request.headers.get("accept")?.includes("text/html");
	if (response.status === 404 && wantsHtml) {
		// Astro emits the root 404 as `/404.html` but localized pages use the directory
		// format, so the Indonesian 404 lives at `/id/404/index.html`.
		const isId = url.pathname === "/id" || url.pathname.startsWith("/id/");
		const fallback = await next(new URL(isId ? "/id/404/index.html" : "/404.html", url).toString());
		return new Response(fallback.body, { status: 404, headers: fallback.headers });
	}

	return response;
}

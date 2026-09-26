import { toMarkdownPath } from "../src/lib/agent/markdown-path";

interface MiddlewareContext {
	request: Request;
	next: () => Promise<Response>;
	env: { ASSETS: { fetch: (input: string) => Promise<Response> } };
}

const SKIPPED_PREFIXES = ["/api/", "/md/", "/_astro/", "/og/", "/.well-known/"];

const DISCOVERY_LINKS = [
	'</.well-known/api-catalog>; rel="api-catalog"',
	'</openapi.json>; rel="service-desc"; type="application/openapi+json"',
	'</.well-known/agent-skills/guestbook/SKILL.md>; rel="service-doc"; type="text/markdown"',
];

function isPage(pathname: string) {
	if (SKIPPED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return false;
	}
	return !/\.[a-z0-9]+$/i.test(pathname);
}

function wantsMarkdown(request: Request) {
	if (request.method !== "GET" && request.method !== "HEAD") return false;
	return request.headers.get("accept")?.includes("text/markdown") ?? false;
}

async function serveMarkdown(context: MiddlewareContext, url: URL) {
	const asset = await context.env.ASSETS.fetch(
		new URL(toMarkdownPath(url.pathname), url).toString(),
	);
	if (asset.status !== 200) return null;

	const text = await asset.text();
	return new Response(text, {
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			Vary: "Accept",
			"X-Markdown-Tokens": String(Math.ceil(text.length / 4)),
		},
	});
}

function withAgentLinks(response: Response, url: URL) {
	const type = response.headers.get("content-type") ?? "";
	if (!type.includes("text/html")) return response;

	const headers = new Headers(response.headers);
	headers.append("Vary", "Accept");
	for (const link of [
		`<${toMarkdownPath(url.pathname)}>; rel="alternate"; type="text/markdown"`,
		...DISCOVERY_LINKS,
	]) {
		headers.append("Link", link);
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
}

export async function onRequest(context: MiddlewareContext) {
	const url = new URL(context.request.url);
	if (!isPage(url.pathname)) return context.next();

	if (wantsMarkdown(context.request)) {
		const markdown = await serveMarkdown(context, url);
		if (markdown) return markdown;
	}

	const response = await context.next();
	if (response.status !== 200) return response;
	return withAgentLinks(response, url);
}

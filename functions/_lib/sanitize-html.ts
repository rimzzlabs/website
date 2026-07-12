// Allowlist the contact body's HTML with Cloudflare's native HTMLRewriter rather
// than a hand-rolled regex sanitizer, which is easy to get subtly wrong.

// Ambient typing for the slice of HTMLRewriter we use; the runtime provides it
// globally, and @cloudflare/workers-types would replace the DOM lib the other
// functions rely on.
interface RewriterElement {
	tagName: string;
	readonly attributes: IterableIterator<[string, string]>;
	getAttribute(name: string): string | null;
	setAttribute(name: string, value: string): RewriterElement;
	removeAttribute(name: string): RewriterElement;
	remove(): RewriterElement;
	removeAndKeepContent(): RewriterElement;
}

interface RewriterComment {
	remove(): RewriterComment;
}

declare class HTMLRewriter {
	on(selector: string, handlers: { element(element: RewriterElement): void }): HTMLRewriter;
	onDocument(handlers: { comments(comment: RewriterComment): void }): HTMLRewriter;
	transform(response: Response): Response;
}

const ALLOWED_TAGS = new Set([
	"p",
	"br",
	"strong",
	"b",
	"em",
	"i",
	"u",
	"s",
	"code",
	"pre",
	"blockquote",
	"ul",
	"ol",
	"li",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"a",
	"hr",
]);

// Tags dropped together with their content — embedding, raw-text, scripting and
// interactive elements whose inner content is never wanted in a plain message.
// Any other unknown tag is unwrapped (removeAndKeepContent) so its text survives.
const DROP_TAGS = new Set([
	"script",
	"style",
	"iframe",
	"object",
	"embed",
	"svg",
	"math",
	"form",
	"textarea",
	"select",
	"button",
	"input",
	"noscript",
	"template",
	"title",
	"base",
	"link",
	"meta",
	"head",
	"frame",
	"frameset",
	"applet",
	"canvas",
	"audio",
	"video",
	"source",
]);

const SAFE_HREF = /^(https?:|mailto:)/i;

// Defensive upper bound so a pathological payload can't make the rewriter chew
// through megabytes. Well above any legitimate contact message.
const MAX_HTML_LENGTH = 100_000;

export function sanitizeHtml(html: string): Promise<string> {
	const input = html.length > MAX_HTML_LENGTH ? html.slice(0, MAX_HTML_LENGTH) : html;

	const rewriter = new HTMLRewriter()
		.onDocument({
			comments(comment) {
				comment.remove();
			},
		})
		.on("*", {
			element(element) {
				const tag = element.tagName.toLowerCase();

				if (DROP_TAGS.has(tag)) {
					element.remove();
					return;
				}
				if (!ALLOWED_TAGS.has(tag)) {
					element.removeAndKeepContent();
					return;
				}

				const href = tag === "a" ? element.getAttribute("href") : null;
				for (const name of Array.from(element.attributes, ([attr]) => attr)) {
					element.removeAttribute(name);
				}
				if (href && SAFE_HREF.test(href.trim())) {
					element.setAttribute("href", href.trim());
					element.setAttribute("target", "_blank");
					element.setAttribute("rel", "noopener noreferrer nofollow");
				}
			},
		});

	return rewriter.transform(new Response(input)).text();
}

import { isLocale } from "@rimzzlabs/i18n/config";
import {
	formatExactTime,
	type Presence,
	presenceLabel,
} from "@rimzzlabs/presence";

// Fills each [data-presence] badge in the static HTML with the live status,
// so crawlers and no-JS visitors read it without the client script.

interface RewriterElement {
	getAttribute(name: string): string | null;
	setAttribute(name: string, value: string): void;
	removeAttribute(name: string): void;
	setInnerContent(content: string, options?: { html: boolean }): void;
}

declare class HTMLRewriter {
	on(
		selector: string,
		handlers: { element(element: RewriterElement): void },
	): HTMLRewriter;
	transform(response: Response): Response;
}

function escapeHtml(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function toMarkup(params: {
	presence: Presence;
	element: RewriterElement;
	now: number;
}) {
	const locale = params.element.getAttribute("data-locale");
	if (!isLocale(locale)) return null;

	const label = presenceLabel({
		presence: params.presence,
		now: params.now,
		locale,
		copy: {
			online: params.element.getAttribute("data-copy-online") ?? "",
			lastActive: params.element.getAttribute("data-copy-last-active") ?? "",
			offline: params.element.getAttribute("data-copy-offline") ?? "",
		},
	});
	const lastActiveAt = params.presence.lastActiveAt;
	if (!lastActiveAt) return escapeHtml(label);

	const exact = formatExactTime(lastActiveAt, locale);
	return `<time datetime="${lastActiveAt}" title="${escapeHtml(exact)}">${escapeHtml(label)}</time>`;
}

export function rewritePresence(response: Response, presence: Presence) {
	const type = response.headers.get("content-type") ?? "";
	if (!type.includes("text/html")) return response;

	const now = Date.now();
	let markup: string | null = null;

	const rewritten = new HTMLRewriter()
		.on("[data-presence]", {
			element(element) {
				markup = toMarkup({ presence, element, now });
				if (markup === null) return;
				element.removeAttribute("hidden");
				element.setAttribute("data-status", presence.status);
				element.setAttribute("data-last-active", presence.lastActiveAt ?? "");
			},
		})
		.on("[data-presence-text]", {
			element(element) {
				if (markup === null) return;
				element.setInnerContent(markup, { html: true });
			},
		})
		.transform(response);

	// The body changes with the status, so the static ETag no longer matches.
	const headers = new Headers(rewritten.headers);
	headers.delete("etag");
	return new Response(rewritten.body, {
		status: rewritten.status,
		statusText: rewritten.statusText,
		headers,
	});
}

export type MarkdownLinks = Record<string, { href: string; label: string }>;

const ENTITIES: Record<string, string> = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": '"',
	"&#39;": "'",
	"&nbsp;": " ",
};

export function htmlToMarkdown(html: string) {
	return html
		.replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/g, "[$2]($1)")
		.replace(/<\/?(em|i)(\s[^>]*)?>/g, "_")
		.replace(/<\/?(strong|b)(\s[^>]*)?>/g, "**")
		.replace(/<br\s*\/?>/g, "\n")
		.replace(/<[^>]+>/g, "")
		.replace(/&[a-z#0-9]+;/g, (entity) => ENTITIES[entity] ?? entity);
}

export function richText(text: string, links: MarkdownLinks) {
	const linked = text.replace(/\{(\w+)\}/g, (match, key: string) => {
		const link = links[key];
		if (!link) return match;
		return `[${link.label}](${link.href})`;
	});
	return htmlToMarkdown(linked);
}

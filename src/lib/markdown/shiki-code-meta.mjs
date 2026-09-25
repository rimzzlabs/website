const TITLE_PATTERN = /title="([^"]+)"/;
const LINE_MARKS = [
	{ className: "highlighted", pattern: /(?:^|\s)\{([\d,\s-]+)\}/ },
	{ className: "diff-add", pattern: /\bins=\{([\d,\s-]+)\}/ },
	{ className: "diff-remove", pattern: /\bdel=\{([\d,\s-]+)\}/ },
];

function parseRanges(raw) {
	const lines = new Set();
	for (const part of raw.split(",")) {
		const [start, end] = part.trim().split("-").map(Number);
		for (let line = start; line <= (end || start); line += 1) lines.add(line);
	}
	return lines;
}

/**
 * Reads fence metadata and exposes it to NoteCodeBlock:
 * ```ts title="app.ts" showLineNumbers {3} ins={4-5} del={6}
 * `{}` marks emphasis, `ins={}` added lines, `del={}` removed lines.
 * @returns {import("shiki").ShikiTransformer}
 */
export function shikiCodeMeta() {
	return {
		name: "rimzzlabs:code-meta",
		pre(node) {
			const meta = this.options.meta?.__raw ?? "";
			const title = meta.match(TITLE_PATTERN)?.[1];
			if (title) node.properties["data-title"] = title;
			if (meta.includes("showLineNumbers")) {
				node.properties["data-line-numbers"] = "";
			}
		},
		line(node, line) {
			const meta = this.options.meta?.__raw ?? "";
			for (const mark of LINE_MARKS) {
				const ranges = meta.match(mark.pattern)?.[1];
				if (ranges && parseRanges(ranges).has(line)) {
					this.addClassToHast(node, mark.className);
				}
			}
		},
	};
}

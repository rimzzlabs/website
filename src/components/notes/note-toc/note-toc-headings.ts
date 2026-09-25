import type { MarkdownHeading } from "astro";

export interface TocHeading {
	depth: number;
	slug: string;
	text: string;
}

export function toTocHeadings(
	headings: ReadonlyArray<MarkdownHeading>,
): Array<TocHeading> {
	return headings
		.filter((heading) => heading.depth === 2 || heading.depth === 3)
		.map((heading) => ({
			depth: heading.depth,
			slug: heading.slug,
			text: heading.text,
		}));
}

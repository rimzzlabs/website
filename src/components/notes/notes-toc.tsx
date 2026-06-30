import type { MarkdownHeading } from "astro";
import { useMemo } from "react";
import { useToc } from "@/hooks/use-toc";
import { NotesTocItem } from "./notes-toc-item";
import { NotesTocProgress } from "./notes-toc-progress";

export interface NestedHeading extends MarkdownHeading {
	subheadings: Array<NestedHeading>;
}

function nestHeadings(headings: Array<MarkdownHeading>): Array<NestedHeading> {
	const roots: Array<NestedHeading> = [];
	const parents = new Map<number, NestedHeading>();

	for (const heading of headings) {
		const node: NestedHeading = { ...heading, subheadings: [] };
		parents.set(node.depth, node);
		if (node.depth === 2) {
			roots.push(node);
		} else {
			parents.get(node.depth - 1)?.subheadings.push(node);
		}
	}

	return roots;
}

export function NotesToc({ headings }: { headings: Array<MarkdownHeading> }) {
	const inView = useToc(headings.map((heading) => heading.slug));
	const nested = useMemo(() => nestHeadings(headings), [headings]);

	return (
		<aside className="max-w-max pl-14 max-sm:hidden">
			<div className="sticky top-8 right-0">
				<h3 className="pb-4 text-lg font-semibold">On this page</h3>
				<nav className="relative overflow-y-hidden">
					<ul className="list-outside border-l-2 text-left">
						{nested.map((heading) => (
							<NotesTocItem key={heading.slug} heading={heading} inView={inView} />
						))}
					</ul>
					<NotesTocProgress inView={inView} />
				</nav>
			</div>
		</aside>
	);
}

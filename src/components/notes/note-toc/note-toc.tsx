import { TextAlignLeftIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import { useLayoutEffect, useRef, useState } from "react";

import type { TocHeading } from "@/components/notes/note-toc/note-toc-headings";
import { useActiveHeading } from "@/lib/hooks/use-active-heading";

interface NoteTocProps {
	headings: ReadonlyArray<TocHeading>;
}

interface MarkerPosition {
	top: number;
	height: number;
}

function findSectionSlug(
	headings: ReadonlyArray<TocHeading>,
	activeSlug: string,
) {
	const activeIndex = headings.findIndex(
		(heading) => heading.slug === activeSlug,
	);
	const section = headings
		.slice(0, activeIndex + 1)
		.findLast((heading) => heading.depth === 2);
	return section?.slug ?? activeSlug;
}

function findLink(list: HTMLUListElement | null, slug: string) {
	return list?.querySelector<HTMLAnchorElement>(
		`a[data-slug="${CSS.escape(slug)}"]`,
	);
}

export function NoteToc(props: NoteTocProps) {
	const listRef = useRef<HTMLUListElement>(null);
	const [marker, setMarker] = useState<MarkerPosition | null>(null);
	const active = useActiveHeading(
		props.headings.map((heading) => heading.slug),
	);
	const section = findSectionSlug(props.headings, active);

	useLayoutEffect(() => {
		const sectionLink = findLink(listRef.current, section);
		const activeLink = findLink(listRef.current, active);
		if (!sectionLink || !activeLink) return;

		setMarker({
			top: sectionLink.offsetTop,
			height:
				activeLink.offsetTop + activeLink.offsetHeight - sectionLink.offsetTop,
		});
	}, [active, section]);

	return (
		<nav aria-labelledby="note-toc-title" className="text-sm">
			<p
				id="note-toc-title"
				className="flex items-center gap-2 pb-3 font-medium text-foreground"
			>
				<TextAlignLeftIcon aria-hidden="true" className="size-4" />
				On this page
			</p>

			<div className="relative">
				<div
					aria-hidden="true"
					className="absolute inset-y-0 left-0 w-px bg-border"
				/>
				{marker && (
					<div
						aria-hidden="true"
						className="absolute left-0 w-0.5 -translate-x-px rounded-full bg-foreground transition-[top,height] duration-200 ease-out"
						style={{ top: marker.top, height: marker.height }}
					/>
				)}

				<ul ref={listRef} className="relative flex flex-col">
					{props.headings.map((heading) => (
						<li key={heading.slug}>
							<a
								href={`#${heading.slug}`}
								data-slug={heading.slug}
								data-highlighted={
									heading.slug === active || heading.slug === section
								}
								aria-current={active === heading.slug ? "location" : undefined}
								className={cn(
									"block py-1 pr-2 leading-snug text-pretty text-muted-foreground transition-colors hover:text-foreground data-[highlighted=true]:text-foreground",
									heading.depth === 2 && "pl-4",
									heading.depth === 3 && "pl-7",
								)}
							>
								{heading.text}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}

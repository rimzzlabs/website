import type { NestedHeading } from "./notes-toc";

export function NotesTocItem({ heading, inView }: { heading: NestedHeading; inView: string }) {
	return (
		<li className="pl-4">
			<a
				href={`#${heading.slug}`}
				data-in-view={inView === heading.slug}
				className="inline-block text-sm text-muted-foreground data-[in-view=true]:text-orange-500"
			>
				{heading.text}
			</a>
			{heading.subheadings.length > 0 && (
				<ul>
					{heading.subheadings.map((subheading) => (
						<NotesTocItem key={subheading.slug} heading={subheading} inView={inView} />
					))}
				</ul>
			)}
		</li>
	);
}

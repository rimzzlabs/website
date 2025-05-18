import type { MarkdownHeading } from 'astro'

interface NestedHeading extends MarkdownHeading {
	subheadings: Array<NestedHeading>
}

interface NotesTocItemProps {
	heading: NestedHeading
	inView: string
}

export function NotesTocItem({ heading, inView }: NotesTocItemProps) {
	return (
		<li key={heading.slug} className='pl-4'>
			<a
				data-in-view={inView === heading.slug}
				className='inline-block text-sm text-muted-foreground data-[in-view=true]:text-orange-500'
				href={`#${heading.slug}`}
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
	)
}

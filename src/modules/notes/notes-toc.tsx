import { A, F, pipe } from '@mobily/ts-belt'
import type { MarkdownHeading } from 'astro'
import { NotesTocItem } from './notes-toc-item'
import { useToc } from '@/hooks/use-toc'
import { useMemo } from 'react'
import { NotesTocProgress } from './notes-toc-progress'

interface NestedHeading extends MarkdownHeading {
	subheadings: Array<NestedHeading>
}

interface NotesTocProps {
	headings: Array<MarkdownHeading>
}

let parentHeadings = new Map<number, MarkdownHeading & { subheadings: Array<MarkdownHeading> }>()

export function NotesToc(props: NotesTocProps) {
	let inView = useToc(
		pipe(
			props.headings,
			A.map((h) => h.slug),
			F.toMutable,
		),
	)

	let headings = useMemo(() => {
		return pipe(
			props.headings,
			A.reduce([] as Array<NestedHeading>, (acc, h) => {
				let heading = { ...h, subheadings: [] }

				parentHeadings.set(heading.depth, heading)
				if (heading.depth === 2) {
					acc.push(heading)
				} else {
					parentHeadings.get(heading.depth - 1)?.subheadings.push(heading)
				}

				return acc
			}),
		)
	}, [props.headings])

	return (
		<aside className='max-sm:hidden pl-14 max-w-max'>
			<div className='sticky top-8 right-0'>
				<h3 className='text-lg font-semibold pb-4'>On this page</h3>

				<nav className='relative overflow-y-hidden'>
					<ul className='list-outside text-left border-l-2'>
						{headings.map((heading) => (
							<NotesTocItem key={heading.slug} heading={heading} inView={inView} />
						))}
					</ul>

					<NotesTocProgress inView={inView} />
				</nav>
			</div>
		</aside>
	)
}

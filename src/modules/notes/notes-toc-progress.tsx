import { useTocProgress } from '@/hooks/use-toc-progress'

export function NotesTocProgress({ inView }: { inView: string }) {
	let [top, height] = useTocProgress(inView)

	return (
		<div
			className='absolute -left-0.5 top-0 w-1 bg-orange-500 transition ease-out duration-300'
			style={{ transform: `translateY(${top}px)`, height }}
		/>
	)
}

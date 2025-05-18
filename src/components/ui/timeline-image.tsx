import { cn } from '@/lib/utils'
import { useRef, type ComponentPropsWithoutRef } from 'react'
import { ImageIcon } from 'lucide-react'
import { useInView } from 'motion/react'

interface TimelineImageProps extends ComponentPropsWithoutRef<'img'> {
	containerClassName?: string
}
export function TimelineImage({ containerClassName, ...props }: TimelineImageProps) {
	let container = useRef<HTMLDivElement>(null)
	let isInView = useInView(container, { once: true, margin: '20% 0px' })

	if (!isInView) {
		return (
			<div
				ref={container}
				className={cn(
					'bg-muted text-muted-foreground grid place-items-center h-32 rounded-xl',
					props.className,
					containerClassName,
				)}
			>
				<ImageIcon className='size-5' />
			</div>
		)
	}

	return (
		<div ref={container} className={cn('max-w-full', containerClassName)}>
			{isInView ? (
				<img
					{...props}
					alt={props.alt}
					loading='lazy'
					fetchPriority='high'
					className={cn('object-cover rounded-xl h-32 w-full cover-img', props.className)}
				/>
			) : (
				<div
					ref={container}
					className={cn(
						'bg-muted text-muted-foreground grid place-items-center h-32 rounded-xl',
						props.className,
						containerClassName,
					)}
				>
					<ImageIcon className='size-5' />
				</div>
			)}
		</div>
	)
}

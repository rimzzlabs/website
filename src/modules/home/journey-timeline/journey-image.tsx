import { cn } from '@/lib/utils'
import { useRef, type ComponentPropsWithoutRef } from 'react'
import { ImageIcon } from 'lucide-react'
import { useInView } from 'motion/react'

interface JourneyImageProps extends ComponentPropsWithoutRef<'img'> {
	containerClassName?: string
}
export function JourneyImage({ containerClassName, ...props }: JourneyImageProps) {
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
		<div className={cn('max-w-full', containerClassName)}>
			<img
				{...props}
				alt={props.alt}
				width={1280}
				height={640}
				loading='lazy'
				fetchPriority='high'
				className={cn('object-cover rounded-xl h-32 w-full cover-img', props.className)}
			/>
		</div>
	)
}

import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

export function TimelineText(props: ComponentPropsWithoutRef<'p'>) {
	return (
		<p
			{...props}
			className={cn('text-sm lg:text-base text-muted-foreground text-pretty', props.className)}
		/>
	)
}

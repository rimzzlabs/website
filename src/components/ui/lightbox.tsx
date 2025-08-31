import { useCallback, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from './carousel'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './dialog'

type LigthboxProps = {
	images: Array<{ src: string; alt: string; title?: string }>
	children: (onOpenLightbox: (index: number) => void) => React.ReactNode
}

export function Lightbox(props: LigthboxProps) {
	let [open, setOpen] = useState(false)
	let [index, setIndex] = useState(0)

	let onOpenLightbox = useCallback((index: number) => {
		setIndex(index)
		setTimeout(() => {
			setOpen(true)
		}, 250)
	}, [])

	return (
		<Fragment>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-2xl'>
					<DialogHeader>
						<DialogTitle>Photo Details</DialogTitle>
						<DialogDescription>Swipe to scroll through the images</DialogDescription>
					</DialogHeader>

					<Carousel key={index} opts={{ startIndex: index, active: true }}>
						<CarouselContent>
							{props.images.map((image) => (
								<CarouselItem key={image.src} className=''>
									<img
										src={image.src}
										alt={image.alt}
										fetchPriority='low'
										className=' h-[32rem] lg:h-[36rem] lg:w-full object-center lg:object-scale-down object-contain'
									/>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</DialogContent>
			</Dialog>

			{props.children(onOpenLightbox)}
		</Fragment>
	)
}

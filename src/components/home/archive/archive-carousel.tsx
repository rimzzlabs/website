import { useMotionEnabled } from "@/hooks/use-motion";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../ui/carousel";
import type { Photo } from "./archive-photos";

/** The photo carousel (embla). Slide animation is gated by the motion preference. */
export function ArchiveCarousel({
	photos,
	startIndex,
}: {
	photos: Array<Photo>;
	startIndex?: number;
}) {
	const motionEnabled = useMotionEnabled();

	return (
		<Carousel
			className="mx-auto w-full max-w-91"
			opts={{ startIndex, loop: true, duration: motionEnabled ? undefined : 0 }}
		>
			<CarouselContent>
				{photos.map((photo) => (
					<CarouselItem key={photo.src} className="flex items-center justify-center">
						<figure className="w-full">
							<img
								src={photo.src}
								srcSet={photo.srcSet}
								sizes="364px"
								alt={photo.alt}
								width={photo.width}
								height={photo.height}
								className="max-h-[70vh] w-auto rounded-lg object-contain md:max-h-[60vh]"
							/>
							<figcaption className="pt-2 text-sm text-muted-foreground">{photo.alt}</figcaption>
						</figure>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="-left-6" />
			<CarouselNext className="-right-6" />
		</Carousel>
	);
}

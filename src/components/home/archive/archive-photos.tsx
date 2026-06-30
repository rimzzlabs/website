import type { ImageMetadata } from "astro";
import { X } from "lucide-react";
import { useState } from "react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../../ui/carousel";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
} from "../../ui/drawer";

export type Photo = { image: ImageMetadata; alt: string };

/**
 * Bento grid of a timeline's photos: uniform cropped tiles, with the first tile
 * widened on odd counts so the grid stays gap-free. Tapping one opens a drawer
 * with a carousel of all the year's photos (uncropped), starting on the tapped
 * image. Carousel motion is gated by the user's animation preference.
 */
export function ArchivePhotos({ photos, label }: { photos: Array<Photo>; label: string }) {
	const motionEnabled = useMotionEnabled();
	const [index, setIndex] = useState<number | null>(null);

	const wideFirst = photos.length % 2 === 1;

	return (
		<>
			<div className="grid grid-cols-2 gap-2">
				{photos.map((photo, i) => (
					<button
						key={photo.image.src}
						type="button"
						onClick={() => setIndex(i)}
						aria-label={`Open photo: ${photo.alt}`}
						className={cn(
							"group relative overflow-hidden rounded-lg border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring",
							wideFirst && i === 0 ? "col-span-2 aspect-2/1" : "aspect-square",
						)}
					>
						<img
							src={photo.image.src}
							alt={photo.alt}
							loading="lazy"
							decoding="async"
							className="size-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
						/>
					</button>
				))}
			</div>

			<Drawer
				open={index !== null}
				onOpenChange={(open) => {
					if (!open) setIndex(null);
				}}
			>
				<DrawerContent>
					<DrawerTitle className="sr-only">{label} — photos</DrawerTitle>
					<DrawerDescription className="sr-only">
						Swipe or use the arrow buttons to browse the photos.
					</DrawerDescription>

					<DrawerClose
						aria-label="Close"
						className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					>
						<X className="size-4" />
					</DrawerClose>

					<div className="px-12 py-6">
						<Carousel
							key={index ?? "closed"}
							opts={{
								startIndex: index ?? 0,
								loop: true,
								duration: motionEnabled ? undefined : 0,
							}}
							className="mx-auto w-full max-w-2xl"
						>
							<CarouselContent>
								{photos.map((photo) => (
									<CarouselItem key={photo.image.src} className="flex items-center justify-center">
										<img
											src={photo.image.src}
											alt={photo.alt}
											className="max-h-[70vh] w-auto rounded-lg object-contain"
										/>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-2" />
							<CarouselNext className="right-2" />
						</Carousel>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}

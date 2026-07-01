import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArchiveCarouselPopup } from "./archive-carousel-popup";
import type { OptimizedImage } from "./archive-images";

export type Photo = OptimizedImage & { alt: string };

// Grid tiles render at ~1/4 of the content column on desktop, roughly full-width
// (2-up) on mobile; the wide first tile spans both columns.
const GRID_SIZES = "(min-width: 1024px) 200px, 45vw";

/**
 * Bento grid of a timeline's photos: uniform cropped tiles, with the first tile
 * widened on odd counts so the grid stays gap-free. Tapping a tile morphs it
 * (shared `layoutId`) into the carousel popup on that photo.
 */
export function ArchivePhotos({ photos, label }: { photos: Array<Photo>; label: string }) {
	const [index, setIndex] = useState<number>(0);
	const [open, setOpen] = useState(false);

	const wideFirst = photos.length % 2 === 1;

	return (
		<>
			<div className="grid grid-cols-2 gap-2">
				{photos.map((photo, i) => (
					<button
						key={photo.src}
						type="button"
						onClick={() => {
							setIndex(i);
							setOpen(true);
						}}
						aria-label={`Open photo: ${photo.alt}`}
						className={cn(
							"group relative overflow-hidden rounded-lg border bg-muted outline-none focus-visible:ring-2 focus-visible:ring-ring",
							wideFirst && i === 0 ? "col-span-2 aspect-2/1" : "aspect-square",
						)}
					>
						<img
							src={photo.src}
							srcSet={photo.srcSet}
							sizes={GRID_SIZES}
							alt={photo.alt}
							width={photo.width}
							height={photo.height}
							loading="lazy"
							decoding="async"
							className="size-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
						/>
					</button>
				))}
			</div>

			<ArchiveCarouselPopup
				open={open}
				photos={photos}
				label={label}
				index={index}
				onClose={() => {
					setOpen(false);
				}}
			/>
		</>
	);
}

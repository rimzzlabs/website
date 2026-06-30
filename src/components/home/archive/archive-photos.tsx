import type { ImageMetadata } from "astro";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArchiveCarouselPopup } from "./archive-carousel-popup";

export type Photo = { image: ImageMetadata; alt: string };

/**
 * Bento grid of a timeline's photos: uniform cropped tiles, with the first tile
 * widened on odd counts so the grid stays gap-free. Tapping a tile morphs it
 * (shared `layoutId`) into the carousel popup on that photo.
 */
export function ArchivePhotos({ photos, label }: { photos: Array<Photo>; label: string }) {
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

			<ArchiveCarouselPopup
				photos={photos}
				label={label}
				index={index}
				onClose={() => setIndex(null)}
			/>
		</>
	);
}

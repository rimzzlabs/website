import { cn } from "cn";
import { useRef } from "react";

import { ImageLightboxDialog } from "@/components/media/image-lightbox/image-lightbox-dialog";
import { useLightboxTransition } from "@/components/media/image-lightbox/use-lightbox-transition";
import { type MasonryColumn, toMasonryColumns } from "@/lib/masonry";

interface ImageSize {
	src: string;
	width: number;
	height: number;
}

export interface ImageGallery {
	alt: string;
	thumb: ImageSize;
	full: ImageSize;
}

interface HomeGalleryProps {
	images: ReadonlyArray<ImageGallery>;
}

interface GalleryItemProps {
	image: ImageGallery;
	index: number;
	onOpen: () => void;
}

function GalleryItem(props: GalleryItemProps) {
	return (
		<button
			type="button"
			aria-label={`${props.image.alt}, view full size`}
			onClick={props.onOpen}
			className="group/gallery block w-full cursor-zoom-in rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-muted/20 focus-visible:outline-transparent"
		>
			<img
				src={props.image.thumb.src}
				width={props.image.thumb.width}
				height={props.image.thumb.height}
				alt={props.image.alt}
				data-lightbox-index={props.index}
				decoding="async"
				loading="lazy"
				className="w-full rounded-sm outline-1 -outline-offset-1 outline-black/10 dark:outline-white/1 dark:brightness-95 dark:group-hover/gallery:brightness-75 group-active/gallery:scale-99 transition"
			/>
		</button>
	);
}

interface GalleryColumnsProps {
	columns: Array<MasonryColumn<ImageGallery>>;
	className: string;
	onOpen: (index: number) => void;
}

function GalleryColumns(props: GalleryColumnsProps) {
	return (
		<div className={cn("gap-2", props.className)}>
			{props.columns.map((column) => (
				<div key={column.key} className="flex min-w-0 flex-1 flex-col gap-2">
					{column.entries.map((entry) => (
						<GalleryItem
							key={entry.item.thumb.src}
							image={entry.item}
							index={entry.index}
							onOpen={() => props.onOpen(entry.index)}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export function HomeGallery(props: HomeGalleryProps) {
	const thumbnailsRef = useRef<HTMLDivElement>(null);

	const lightboxImages = props.images.map((image) => ({
		...image.full,
		alt: image.alt,
	}));

	const lightbox = useLightboxTransition({
		getImage: (index) => lightboxImages[index],
		findThumbnail: (index) =>
			[
				...(thumbnailsRef.current?.querySelectorAll<HTMLElement>(
					`[data-lightbox-index="${index}"]`,
				) ?? []),
			].find((element) => element.getClientRects().length > 0),
	});

	return (
		<>
			<div ref={thumbnailsRef}>
				<GalleryColumns
					columns={toMasonryColumns(props.images, 2)}
					className="flex md:hidden"
					onOpen={lightbox.open}
				/>
				<GalleryColumns
					columns={toMasonryColumns(props.images, 3)}
					className="hidden md:flex"
					onOpen={lightbox.open}
				/>
			</div>

			<ImageLightboxDialog
				images={lightboxImages}
				openIndex={lightbox.openIndex}
				title="Gallery"
				onClose={lightbox.close}
				onSelectedIndexChange={lightbox.onSelectedIndexChange}
			/>
		</>
	);
}

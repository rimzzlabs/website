import { useState } from "react";

import { NoteImageLightbox } from "@/components/notes/note-image/note-image-lightbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMotionEnabled } from "@/hooks/use-motion";
import type { Lang } from "@/i18n/config";
import { cn } from "@/lib/utils";

export interface NoteImageSource {
	alt: string;
	thumb: {
		src: string;
		srcSet: string;
		sizes: string;
		width: number;
		height: number;
	};
	full: {
		src: string;
		width: number;
		height: number;
	};
}

export interface NoteImageCopy {
	view: string;
	zoomIn: string;
	zoomOut: string;
	close: string;
	previous: string;
	next: string;
	counter: (current: number, total: number) => string;
}

const COPY: Record<Lang, NoteImageCopy> = {
	en: {
		view: "view full size",
		zoomIn: "Zoom in",
		zoomOut: "Zoom out",
		close: "Close",
		previous: "Previous image",
		next: "Next image",
		counter: (current, total) => `Image ${current} of ${total}`,
	},
	id: {
		view: "lihat ukuran penuh",
		zoomIn: "Perbesar",
		zoomOut: "Perkecil",
		close: "Tutup",
		previous: "Gambar sebelumnya",
		next: "Gambar berikutnya",
		counter: (current, total) => `Gambar ${current} dari ${total}`,
	},
};

interface NoteImageGalleryProps {
	images: NoteImageSource[];
	lang: Lang;
	caption?: string;
	imageClass?: string;
	priority?: boolean;
}

export function NoteImageGallery(props: NoteImageGalleryProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const motionEnabled = useMotionEnabled();
	const copy = COPY[props.lang];

	const single = props.images.length === 1;
	const spanFirst = !single && props.images.length % 2 === 1;

	return (
		<>
			{single ? (
				<button
					type="button"
					className="block w-full cursor-zoom-in rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					aria-label={`${props.images[0].alt} (${copy.view})`}
					onClick={() => setOpenIndex(0)}
				>
					<img
						src={props.images[0].thumb.src}
						srcSet={props.images[0].thumb.srcSet}
						sizes={props.images[0].thumb.sizes}
						width={props.images[0].thumb.width}
						height={props.images[0].thumb.height}
						alt={props.images[0].alt}
						loading={props.priority ? "eager" : "lazy"}
						fetchPriority={props.priority ? "high" : undefined}
						decoding="async"
						className={cn("w-full rounded-xl border object-cover", props.imageClass)}
					/>
				</button>
			) : (
				<div className="grid grid-cols-2 gap-2">
					{props.images.map((image, index) => (
						<button
							key={image.thumb.src}
							type="button"
							className={cn(
								"block cursor-zoom-in overflow-hidden rounded-xl border focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
								spanFirst && index === 0 ? "col-span-2 aspect-video" : "aspect-4/3",
							)}
							aria-label={`${image.alt} (${copy.view})`}
							onClick={() => setOpenIndex(index)}
						>
							<img
								src={image.thumb.src}
								srcSet={image.thumb.srcSet}
								sizes={image.thumb.sizes}
								width={image.thumb.width}
								height={image.thumb.height}
								alt={image.alt}
								loading={props.priority && index === 0 ? "eager" : "lazy"}
								fetchPriority={props.priority && index === 0 ? "high" : undefined}
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</button>
					))}
				</div>
			)}

			<Dialog open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
				<DialogContent
					showCloseButton={false}
					className="block h-dvh w-screen max-w-none gap-0 rounded-none border-0 bg-background/95 p-0 ring-0 sm:max-w-none"
				>
					<DialogTitle className="sr-only">{props.caption ?? props.images[0].alt}</DialogTitle>
					{openIndex !== null && (
						<NoteImageLightbox
							images={props.images}
							startIndex={openIndex}
							copy={copy}
							motionEnabled={motionEnabled}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

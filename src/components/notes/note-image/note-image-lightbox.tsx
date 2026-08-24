import { XIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type {
	NoteImageCopy,
	NoteImageSource,
} from "@/components/notes/note-image/note-image-gallery";
import { NoteImageZoomPane } from "@/components/notes/note-image/note-image-zoom-pane";
import type { ZoomPanApi } from "@/components/notes/note-image/use-zoom-pan";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { DialogClose } from "@/components/ui/dialog";

interface NoteImageLightboxProps {
	images: NoteImageSource[];
	startIndex: number;
	copy: NoteImageCopy;
	motionEnabled: boolean;
}

export function NoteImageLightbox(props: NoteImageLightboxProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = useState(props.startIndex);

	const apisRef = useRef(new Map<number, ZoomPanApi>());
	const zoomedRef = useRef(new Set<number>());

	useEffect(() => {
		if (!api) return;
		const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	const registerApi = useCallback((index: number, zoomApi: ZoomPanApi | null) => {
		if (zoomApi) apisRef.current.set(index, zoomApi);
		else apisRef.current.delete(index);
	}, []);

	const handleZoomedChange = useCallback((index: number, zoomed: boolean) => {
		if (zoomed) zoomedRef.current.add(index);
		else zoomedRef.current.delete(index);
	}, []);

	const activeApi = () => apisRef.current.get(selectedIndex);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "+" || event.key === "=") activeApi()?.zoomIn();
		else if (event.key === "-") activeApi()?.zoomOut();
		else if (event.key === "0") activeApi()?.reset();
	};

	const multiple = props.images.length > 1;

	return (
		<Carousel
			opts={{
				startIndex: props.startIndex,
				watchDrag: multiple ? (embla) => !zoomedRef.current.has(embla.selectedScrollSnap()) : false,
			}}
			setApi={setApi}
			className="h-dvh"
			onKeyDown={handleKeyDown}
		>
			<CarouselContent className="h-dvh items-center">
				{props.images.map((image, index) => (
					<CarouselItem key={image.full.src} className="h-dvh py-10">
						<NoteImageZoomPane
							image={image}
							index={index}
							motionEnabled={props.motionEnabled}
							registerApi={registerApi}
							onZoomedChange={handleZoomedChange}
						/>
					</CarouselItem>
				))}
			</CarouselContent>

			<div className="absolute top-3 right-3 flex items-center gap-1.5">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-11"
					aria-label={props.copy.zoomOut}
					onClick={() => activeApi()?.zoomOut()}
				>
					<ZoomOutIcon />
				</Button>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-11"
					aria-label={props.copy.zoomIn}
					onClick={() => activeApi()?.zoomIn()}
				>
					<ZoomInIcon />
				</Button>
				<DialogClose
					render={
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="size-11"
							aria-label={props.copy.close}
						/>
					}
				>
					<XIcon />
				</DialogClose>
			</div>

			{multiple && (
				<>
					<CarouselPrevious className="left-3 size-11 sm:left-4" aria-label={props.copy.previous} />
					<CarouselNext className="right-3 size-11 sm:right-4" aria-label={props.copy.next} />
					<p
						className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-3 py-1 text-xs tabular-nums text-muted-foreground"
						aria-live="polite"
					>
						{props.copy.counter(selectedIndex + 1, props.images.length)}
					</p>
				</>
			)}
		</Carousel>
	);
}

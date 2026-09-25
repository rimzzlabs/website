import {
	MagnifyingGlassMinusIcon,
	MagnifyingGlassPlusIcon,
	XIcon,
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ImageLightboxZoomPane } from "@/components/media/image-lightbox/image-lightbox-zoom-pane";
import { LIGHTBOX_TRANSITION_NAME } from "@/components/media/image-lightbox/use-lightbox-transition";
import {
	MAX_SCALE,
	MIN_SCALE,
	type ZoomPanApi,
} from "@/components/media/image-lightbox/use-zoom-pan";
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
import type { Dictionary } from "@/i18n/en";
import { fill } from "@/i18n/fill";

export interface LightboxImage {
	src: string;
	alt: string;
	width: number;
	height: number;
	caption?: string;
}

export type LightboxCopy = Dictionary["lightbox"];

interface ImageLightboxProps {
	copy: LightboxCopy;
	images: ReadonlyArray<LightboxImage>;
	startIndex: number;
	onSelectedIndexChange?: (index: number) => void;
}

const CONTROL_CLASS = "size-11 aria-disabled:opacity-50";

export function ImageLightbox(props: ImageLightboxProps) {
	const [api, setApi] = useState<CarouselApi>();
	const [selectedIndex, setSelectedIndex] = useState(props.startIndex);
	const [activeScale, setActiveScale] = useState(MIN_SCALE);

	const apisRef = useRef(new Map<number, ZoomPanApi>());
	const scalesRef = useRef(new Map<number, number>());
	const onSelectedIndexChangeRef = useRef(props.onSelectedIndexChange);
	onSelectedIndexChangeRef.current = props.onSelectedIndexChange;

	useEffect(() => {
		if (!api) return;
		const onSelect = () => {
			const next = api.selectedScrollSnap();
			for (const [index, zoomApi] of apisRef.current) {
				const scale = scalesRef.current.get(index) ?? MIN_SCALE;
				if (index !== next && scale > MIN_SCALE) zoomApi.reset();
			}
			setSelectedIndex(next);
			onSelectedIndexChangeRef.current?.(next);
			setActiveScale(scalesRef.current.get(next) ?? MIN_SCALE);
		};
		api.on("select", onSelect);
		return () => {
			api.off("select", onSelect);
		};
	}, [api]);

	const registerApi = useCallback(
		(index: number, zoomApi: ZoomPanApi | null) => {
			if (zoomApi) apisRef.current.set(index, zoomApi);
			else apisRef.current.delete(index);
		},
		[],
	);

	const handleScaleChange = useCallback(
		(index: number, scale: number) => {
			scalesRef.current.set(index, scale);
			if (index === selectedIndex) setActiveScale(scale);
		},
		[selectedIndex],
	);

	const activeApi = () => apisRef.current.get(selectedIndex);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.metaKey || event.ctrlKey || event.altKey) return;

		const actions: Record<string, () => void> = {
			"+": () => activeApi()?.zoomIn(),
			"=": () => activeApi()?.zoomIn(),
			"-": () => activeApi()?.zoomOut(),
			"0": () => activeApi()?.reset(),
			Home: () => api?.scrollTo(0),
			End: () => api?.scrollTo(props.images.length - 1),
		};
		const action = actions[event.key];
		if (!action) return;
		event.preventDefault();
		action();
	};

	const multiple = props.images.length > 1;
	const zoomPercent = Math.round(activeScale * 100);

	return (
		<Carousel
			opts={{
				startIndex: props.startIndex,
				loop: multiple,
				watchDrag: multiple
					? (embla) =>
							(scalesRef.current.get(embla.selectedScrollSnap()) ??
								MIN_SCALE) <= MIN_SCALE
					: false,
			}}
			setApi={setApi}
			className="h-dvh"
			aria-label={props.copy.viewer}
			onKeyDown={handleKeyDown}
		>
			<CarouselContent className="h-dvh">
				{props.images.map((image, index) => (
					<CarouselItem
						key={image.src}
						aria-label={fill(props.copy.slide, {
							index: index + 1,
							total: props.images.length,
						})}
						aria-hidden={index !== selectedIndex}
						className="h-dvh pt-16 pb-6"
					>
						<ImageLightboxZoomPane
							image={image}
							index={index}
							eager={index === props.startIndex}
							transitionName={
								index === selectedIndex ? LIGHTBOX_TRANSITION_NAME : undefined
							}
							registerApi={registerApi}
							onScaleChange={handleScaleChange}
						/>
					</CarouselItem>
				))}
			</CarouselContent>

			<div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-3">
				<p className="px-2 text-sm tabular-nums text-muted-foreground">
					{multiple && (
						<>
							<span aria-hidden>
								{selectedIndex + 1} / {props.images.length}
							</span>
							<span className="sr-only" aria-live="polite">
								{fill(props.copy.counter, {
									index: selectedIndex + 1,
									total: props.images.length,
								})}
							</span>
						</>
					)}
				</p>

				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={CONTROL_CLASS}
						aria-label={props.copy.zoomOut}
						focusableWhenDisabled
						disabled={activeScale <= MIN_SCALE}
						onClick={() => activeApi()?.zoomOut()}
					>
						<MagnifyingGlassMinusIcon />
					</Button>
					<Button
						type="button"
						variant="ghost"
						className="h-11 min-w-16 tabular-nums aria-disabled:opacity-50"
						aria-label={fill(props.copy.resetZoom, { percent: zoomPercent })}
						focusableWhenDisabled
						disabled={activeScale <= MIN_SCALE}
						onClick={() => activeApi()?.reset()}
					>
						{zoomPercent}%
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className={CONTROL_CLASS}
						aria-label={props.copy.zoomIn}
						focusableWhenDisabled
						disabled={activeScale >= MAX_SCALE}
						onClick={() => activeApi()?.zoomIn()}
					>
						<MagnifyingGlassPlusIcon />
					</Button>
					<DialogClose
						render={
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className={CONTROL_CLASS}
								aria-label={props.copy.close}
							/>
						}
					>
						<XIcon />
					</DialogClose>
				</div>
			</div>

			{multiple && (
				<>
					<CarouselPrevious
						className="left-3 size-11 sm:left-4"
						aria-label={props.copy.previous}
					/>
					<CarouselNext
						className="right-3 size-11 sm:right-4"
						aria-label={props.copy.next}
					/>
				</>
			)}
		</Carousel>
	);
}

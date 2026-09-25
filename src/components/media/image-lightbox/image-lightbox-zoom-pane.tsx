import { useEffect } from "react";

import type { LightboxImage } from "@/components/media/image-lightbox/image-lightbox";
import {
	useZoomPan,
	type ZoomPanApi,
} from "@/components/media/image-lightbox/use-zoom-pan";

interface ImageLightboxZoomPaneProps {
	image: LightboxImage;
	index: number;
	eager?: boolean;
	transitionName?: string;
	registerApi: (index: number, api: ZoomPanApi | null) => void;
	onScaleChange: (index: number, scale: number) => void;
}

export function ImageLightboxZoomPane(props: ImageLightboxZoomPaneProps) {
	const { index, registerApi, onScaleChange } = props;

	const zoomPan = useZoomPan({
		onScaleChange: (scale) => onScaleChange(index, scale),
	});

	useEffect(() => {
		registerApi(index, zoomPan.api);
		return () => registerApi(index, null);
	}, [index, registerApi, zoomPan.api]);

	const caption = props.image.caption ?? props.image.alt;

	return (
		<figure className="flex h-full w-full flex-col items-center gap-3">
			<div
				ref={zoomPan.containerRef}
				className="flex min-h-0 w-full flex-1 touch-none items-center justify-center overflow-hidden overscroll-contain"
				{...zoomPan.containerProps}
			>
				<img
					src={props.image.src}
					width={props.image.width}
					height={props.image.height}
					alt={props.image.alt}
					data-lightbox-full-index={props.index}
					draggable={false}
					loading={props.eager ? "eager" : "lazy"}
					decoding="async"
					className="h-auto max-h-full w-auto max-w-full select-none object-contain"
					style={{
						...zoomPan.imageStyle,
						viewTransitionName: props.transitionName,
					}}
				/>
			</div>
			<figcaption
				aria-hidden={caption === props.image.alt}
				className="max-w-prose shrink-0 px-16 text-center text-sm text-pretty text-muted-foreground"
			>
				{caption}
			</figcaption>
		</figure>
	);
}

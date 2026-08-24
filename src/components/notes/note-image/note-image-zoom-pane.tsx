import { useEffect } from "react";

import type { NoteImageSource } from "@/components/notes/note-image/note-image-gallery";
import { useZoomPan, type ZoomPanApi } from "@/components/notes/note-image/use-zoom-pan";

interface NoteImageZoomPaneProps {
	image: NoteImageSource;
	index: number;
	motionEnabled: boolean;
	registerApi: (index: number, api: ZoomPanApi | null) => void;
	onZoomedChange: (index: number, zoomed: boolean) => void;
}

export function NoteImageZoomPane(props: NoteImageZoomPaneProps) {
	const { index, registerApi, onZoomedChange } = props;

	const zoomPan = useZoomPan({
		motionEnabled: props.motionEnabled,
		onZoomedChange: (zoomed) => onZoomedChange(index, zoomed),
	});

	useEffect(() => {
		registerApi(index, zoomPan.api);
		return () => registerApi(index, null);
	}, [index, registerApi, zoomPan.api]);

	return (
		<div
			ref={zoomPan.containerRef}
			className="flex h-full w-full touch-none items-center justify-center overflow-hidden overscroll-contain"
			{...zoomPan.containerProps}
		>
			<img
				src={props.image.full.src}
				width={props.image.full.width}
				height={props.image.full.height}
				alt={props.image.alt}
				draggable={false}
				loading="lazy"
				decoding="async"
				className="max-h-[85dvh] max-w-full select-none rounded-lg object-contain"
				style={zoomPan.imageStyle}
			/>
		</div>
	);
}

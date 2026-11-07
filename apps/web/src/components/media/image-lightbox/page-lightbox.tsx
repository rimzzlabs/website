import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import type {
	LightboxCopy,
	LightboxImage,
} from "@/components/media/image-lightbox/image-lightbox";
import { ImageLightboxDialog } from "@/components/media/image-lightbox/image-lightbox-dialog";
import { useLightboxTransition } from "@/components/media/image-lightbox/use-lightbox-transition";

const TRIGGER_SELECTOR = "[data-lightbox-trigger]";

function toLightboxImage(trigger: HTMLElement): LightboxImage {
	return {
		src: trigger.dataset.lightboxSrc ?? "",
		width: Number(trigger.dataset.lightboxWidth),
		height: Number(trigger.dataset.lightboxHeight),
		alt: trigger.querySelector("img")?.alt ?? "",
	};
}

interface PageLightboxProps {
	copy: LightboxCopy;
}

export function PageLightbox(props: PageLightboxProps) {
	const [images, setImages] = useState<ReadonlyArray<LightboxImage>>([]);
	const imagesRef = useRef<ReadonlyArray<LightboxImage>>([]);
	const thumbnailsRef = useRef<ReadonlyArray<HTMLElement>>([]);

	const lightbox = useLightboxTransition({
		getImage: (index) => imagesRef.current[index],
		findThumbnail: (index) => thumbnailsRef.current[index],
	});
	const openRef = useRef(lightbox.open);
	openRef.current = lightbox.open;

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!(event.target instanceof Element)) return;
			const trigger = event.target.closest<HTMLElement>(TRIGGER_SELECTOR);
			if (!trigger) return;

			const triggers = [
				...document.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR),
			].filter((element) => element.getClientRects().length > 0);

			thumbnailsRef.current = triggers.map(
				(element) => element.querySelector("img") ?? element,
			);
			imagesRef.current = triggers.map(toLightboxImage);
			flushSync(() => setImages(imagesRef.current));
			openRef.current(triggers.indexOf(trigger));
		};

		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);

	return (
		<ImageLightboxDialog
			images={images}
			openIndex={lightbox.openIndex}
			copy={props.copy}
			title={props.copy.pageTitle}
			onClose={lightbox.close}
			onSelectedIndexChange={lightbox.onSelectedIndexChange}
		/>
	);
}

import { useRef, useState } from "react";
import { flushSync } from "react-dom";

import type { LightboxImage } from "@/components/media/image-lightbox/image-lightbox";

export const LIGHTBOX_TRANSITION_NAME = "lightbox-image";

const PRELOAD_TIMEOUT_MS = 500;

interface UseLightboxTransitionParams {
	getImage: (index: number) => LightboxImage | undefined;
	findThumbnail: (index: number) => HTMLElement | undefined;
}

export function supportsViewTransition() {
	return (
		typeof document !== "undefined" &&
		typeof document.startViewTransition === "function"
	);
}

function waitForDecode(image: HTMLImageElement) {
	return Promise.race([
		image.decode().catch(() => undefined),
		new Promise((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT_MS)),
	]);
}

function preloadImage(src: string) {
	const image = new Image();
	image.src = src;
	return waitForDecode(image);
}

export function useLightboxTransition(params: UseLightboxTransitionParams) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const selectedIndexRef = useRef(0);

	const open = async (index: number) => {
		selectedIndexRef.current = index;
		const thumbnail = params.findThumbnail(index);
		const image = params.getImage(index);
		if (!thumbnail || !image || !supportsViewTransition()) {
			setOpenIndex(index);
			return;
		}

		await preloadImage(image.src);
		thumbnail.style.viewTransitionName = LIGHTBOX_TRANSITION_NAME;
		document.startViewTransition(async () => {
			thumbnail.style.viewTransitionName = "";
			flushSync(() => setOpenIndex(index));
			const fullImage = document.querySelector<HTMLImageElement>(
				`img[data-lightbox-full-index="${index}"]`,
			);
			if (fullImage) await waitForDecode(fullImage);
		});
	};

	const close = () => {
		const thumbnail = params.findThumbnail(selectedIndexRef.current);
		if (!thumbnail || !supportsViewTransition()) {
			setOpenIndex(null);
			return;
		}

		const transition = document.startViewTransition(() => {
			flushSync(() => setOpenIndex(null));
			thumbnail.style.viewTransitionName = LIGHTBOX_TRANSITION_NAME;
		});
		transition.finished.finally(() => {
			thumbnail.style.viewTransitionName = "";
		});
	};

	const handleSelectedIndexChange = (index: number) => {
		selectedIndexRef.current = index;
	};

	return {
		openIndex,
		open,
		close,
		onSelectedIndexChange: handleSelectedIndexChange,
	};
}

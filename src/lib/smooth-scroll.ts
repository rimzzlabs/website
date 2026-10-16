import type Lenis from "lenis";
import "lenis/dist/lenis.css";

import { isMotionReduced } from "@/lib/motion";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const LOCKED_OVERFLOW = /hidden|clip/;

function isPageLocked() {
	const html = getComputedStyle(document.documentElement).overflowY;
	const body = getComputedStyle(document.body).overflowY;
	return LOCKED_OVERFLOW.test(html) || LOCKED_OVERFLOW.test(body);
}

async function createLenis() {
	const { default: Lenis } = await import("lenis");
	return new Lenis({
		autoRaf: true,
		allowNestedScroll: true,
		respectReducedMotion: false,
		virtualScroll: () => !isPageLocked(),
	});
}

export function startSmoothScroll() {
	const pointer = window.matchMedia(FINE_POINTER);
	let lenis: Promise<Lenis> | null = null;

	function sync() {
		if (isMotionReduced() || !pointer.matches) {
			lenis?.then((instance) => instance.destroy());
			lenis = null;
			return;
		}
		lenis ??= createLenis();
	}

	sync();
	pointer.addEventListener("change", sync);
	new MutationObserver(sync).observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-motion"],
	});
}

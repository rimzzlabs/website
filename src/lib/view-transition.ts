import { flushSync } from "react-dom";

export function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function morph(update: () => void) {
	if (
		typeof document.startViewTransition !== "function" ||
		prefersReducedMotion()
	) {
		update();
		return;
	}
	document.startViewTransition(() => flushSync(update));
}

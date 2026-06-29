import { useSyncExternalStore } from "react";

const BREAKPPOINT = "(max-width: 639px)";

function getSnapshot() {
	return window.matchMedia(BREAKPPOINT).matches;
}

function subscribe(onSnapshot: () => void) {
	window.matchMedia(BREAKPPOINT).addEventListener("change", onSnapshot);

	return () => {
		window.matchMedia(BREAKPPOINT).removeEventListener("change", onSnapshot);
	};
}
/** True below Tailwind's `sm` breakpoint (640px). */
export function useIsMobile() {
	return useSyncExternalStore(subscribe, getSnapshot);
}

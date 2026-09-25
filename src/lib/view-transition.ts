import { flushSync } from "react-dom";

export function morph(update: () => void) {
	if (typeof document.startViewTransition !== "function") {
		update();
		return;
	}
	document.startViewTransition(() => flushSync(update));
}

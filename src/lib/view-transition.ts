import { flushSync } from "react-dom";

export function morph(update: () => void, name?: string) {
	if (typeof document.startViewTransition !== "function") {
		update();
		return;
	}
	const transition = document.startViewTransition(() => flushSync(update));
	if (!name) return;

	const root = document.documentElement;
	root.dataset.morph = name;
	function clear() {
		if (root.dataset.morph === name) delete root.dataset.morph;
	}
	transition.finished.then(clear, clear);
}

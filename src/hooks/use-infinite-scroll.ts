import { useEffect, useRef } from "react";

/**
 * Fires `onLoadMore` when the returned sentinel scrolls into view, observed
 * within the nearest ScrollArea viewport (falls back to the window). Pass
 * `enabled=false` while a page is loading or the feed is exhausted to disarm it.
 */
export function useInfiniteScroll(onLoadMore: () => void, enabled: boolean) {
	const ref = useRef<HTMLDivElement>(null);
	const callbackRef = useRef(onLoadMore);
	callbackRef.current = onLoadMore;

	useEffect(() => {
		const el = ref.current;
		if (!el || !enabled) return;

		const root = el.closest<HTMLElement>('[data-slot="scroll-area-viewport"]');
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) callbackRef.current();
			},
			{ root, rootMargin: "120px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [enabled]);

	return ref;
}

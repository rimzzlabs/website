import { useEffect, useState } from "react";

const SCROLL_THRESHOLD_PX = 8;
const TOP_OFFSET_PX = 64;

export function useHideOnScroll() {
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const maxScroll = () =>
			document.documentElement.scrollHeight - window.innerHeight;
		const currentScroll = () =>
			Math.min(Math.max(window.scrollY, 0), maxScroll());

		let lastScroll = currentScroll();
		let frame = 0;

		const update = () => {
			frame = 0;
			const scroll = currentScroll();
			const delta = scroll - lastScroll;
			if (Math.abs(delta) < SCROLL_THRESHOLD_PX) return;
			setHidden(delta > 0 && scroll > TOP_OFFSET_PX);
			lastScroll = scroll;
		};

		const handleScroll = () => {
			if (frame === 0) frame = requestAnimationFrame(update);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(frame);
		};
	}, []);

	return hidden;
}

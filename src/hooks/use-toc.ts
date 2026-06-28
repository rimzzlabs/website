import { useEffect, useState } from "react";

export function useToc(headings: Array<string>) {
	const [inView, setInView] = useState("");

	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const isInView = entry.intersectionRatio > 0;
					if (isInView) {
						setInView(entry.target.id);
					}
				}
			},
			{ rootMargin: "-5% 0px -46% 0px", threshold: 0.3 },
		);

		for (const heading of headings) {
			const el = document.getElementById(heading);
			if (el) obs.observe(el);
		}

		return () => {
			obs.disconnect();
		};
	}, [headings]);

	return inView;
}

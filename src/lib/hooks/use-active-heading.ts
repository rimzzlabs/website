import { A, G, pipe } from "@mobily/ts-belt";
import { useEffect, useState } from "react";

const ACTIVE_OFFSET_PX = 120;
const BOTTOM_TOLERANCE_PX = 2;

export function useActiveHeading(slugs: ReadonlyArray<string>) {
	const [active, setActive] = useState(slugs[0] ?? "");

	useEffect(() => {
		const elements = pipe(
			slugs,
			A.map((slug) => document.getElementById(slug)),
			A.filter(G.isNotNullable),
		);
		if (elements.length === 0) return;

		let frame = 0;

		const update = () => {
			frame = 0;
			const root = document.documentElement;
			const atBottom =
				window.innerHeight + window.scrollY >=
				root.scrollHeight - BOTTOM_TOLERANCE_PX;

			if (atBottom) {
				setActive(elements[elements.length - 1].id);
				return;
			}

			let current = elements[0].id;
			for (const element of elements) {
				if (element.getBoundingClientRect().top > ACTIVE_OFFSET_PX) break;
				current = element.id;
			}
			setActive(current);
		};

		const schedule = () => {
			if (frame === 0) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule, { passive: true });
		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			cancelAnimationFrame(frame);
		};
	}, [slugs]);

	return active;
}

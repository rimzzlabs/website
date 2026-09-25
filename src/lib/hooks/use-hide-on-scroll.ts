import { useEffect, useState } from "react";
import { onScrollDirection } from "@/lib/scroll-direction";

const TOP_OFFSET_PX = 64;

export function useHideOnScroll() {
	const [hidden, setHidden] = useState(false);

	useEffect(
		() =>
			onScrollDirection((change) => {
				setHidden(change.direction === "down" && change.scroll > TOP_OFFSET_PX);
			}),
		[],
	);

	return hidden;
}

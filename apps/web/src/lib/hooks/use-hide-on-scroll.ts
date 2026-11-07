import { onScrollDirection } from "@rimzzlabs/utils/scroll-direction";
import { useEffect, useState } from "react";

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

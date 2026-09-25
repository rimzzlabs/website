import type { ScrollChange } from "@/lib/scroll-direction";

export type HeaderState = "top" | "hidden" | "pill";

const TOP_OFFSET_PX = 64;

const STATE_BY_DIRECTION: Record<ScrollChange["direction"], HeaderState> = {
	down: "hidden",
	up: "pill",
};

export function nextHeaderState(previous: HeaderState, change: ScrollChange) {
	if (change.scroll <= 0) return "top";
	if (previous === "top" && change.scroll < TOP_OFFSET_PX) return "top";
	return STATE_BY_DIRECTION[change.direction];
}

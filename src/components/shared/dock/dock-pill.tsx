import { motion } from "motion/react";
import { INSTANT, SPRING } from "@/lib/motion";
import type { DockPosition } from "@/lib/stores/dock";
import { cn } from "@/lib/utils";
import { PILL_CLASS, PILL_HIDDEN, PILL_ICON, TOGGLE_BASE } from "./constants";

/**
 * Folded toggle shown (mobile only) when the dock is collapsed. Tapping it
 * unfolds the dock. Sits near the matching viewport edge, or bottom-center.
 */
export function DockPill({
	position,
	folded,
	motionEnabled,
	onExpand,
}: {
	position: DockPosition;
	folded: boolean;
	motionEnabled: boolean;
	onExpand: () => void;
}) {
	const Icon = PILL_ICON[position];
	return (
		<motion.button
			type="button"
			aria-label="Show dock"
			aria-hidden={!folded}
			tabIndex={folded ? 0 : -1}
			onClick={onExpand}
			initial={false}
			animate={folded ? { opacity: 1, x: 0, y: 0 } : PILL_HIDDEN[position]}
			transition={motionEnabled ? SPRING : INSTANT}
			style={{ pointerEvents: folded ? "auto" : "none" }}
			className={cn("fixed z-50", TOGGLE_BASE, PILL_CLASS[position])}
		>
			<span className="sr-only">Show dock</span>
			<Icon className="size-4" />
		</motion.button>
	);
}

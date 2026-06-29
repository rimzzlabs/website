import { ChevronsDown, ChevronsLeft, ChevronsRight, ChevronsUp } from "lucide-react";
import type { DockPosition } from "@/lib/stores/dock";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";

/** Shared style for the dock's icon buttons. */
export const itemClass = cn(
	buttonVariants({ variant: "ghost", size: "icon" }),
	"rounded-xl text-muted-foreground hover:text-foreground motion-safe:transition-transform motion-safe:hover:-translate-y-0.5",
);

/** Anchor of the dock along the bottom edge. */
export const POSITION_CLASS: Record<DockPosition, string> = {
	left: "left-4 lg:left-16",
	center: "inset-x-0 mx-auto w-fit",
	right: "right-4 lg:right-16",
};

/** Small floating toggle (mobile only): rounded button with a subtle border + shadow. */
export const TOGGLE_BASE =
	"flex size-7 items-center justify-center rounded-lg border bg-background text-muted-foreground shadow-md transition-colors hover:text-foreground sm:hidden";

/** "Hide" toggle floats just outside the dock, slightly overlapping it (reads as attached). */
export const HIDE_BTN_CLASS: Record<DockPosition, string> = {
	left: "top-1/2 left-full -ml-2 -translate-y-1/2",
	center: "bottom-full left-1/2 -mb-2 -translate-x-1/2",
	right: "top-1/2 right-full -mr-2 -translate-y-1/2",
};

export const HIDE_ICON: Record<DockPosition, typeof ChevronsUp> = {
	left: ChevronsLeft,
	center: ChevronsDown,
	right: ChevronsRight,
};

/** "Show" toggle (when folded) floats near the matching viewport edge. */
export const PILL_CLASS: Record<DockPosition, string> = {
	left: "bottom-8 left-3",
	center: "bottom-6 left-1/2 -ml-4",
	right: "bottom-8 right-3",
};

export const PILL_HIDDEN: Record<DockPosition, { opacity: number; x?: number; y?: number }> = {
	left: { opacity: 0, x: -16 },
	center: { opacity: 0, y: 16 },
	right: { opacity: 0, x: 16 },
};

export const PILL_ICON: Record<DockPosition, typeof ChevronsUp> = {
	left: ChevronsRight,
	center: ChevronsUp,
	right: ChevronsLeft,
};

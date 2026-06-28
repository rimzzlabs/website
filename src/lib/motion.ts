import type { Transition } from "motion/react";

/**
 * Shared, non-bouncy spring used for expand/collapse and other UI motion.
 * `bounce: 0` keeps height animations from overshooting and clipping content;
 * `visualDuration` makes the spring reach its target quickly for a snappy feel.
 */
export const SPRING: Transition = {
	type: "spring",
	bounce: 0,
	visualDuration: 0.3,
};

/**
 * Slightly quicker spring for the content fade/rise reveal, so the inner content
 * settles a touch ahead of the height — giving the open/close a layered, slick feel.
 */
export const SPRING_FAST: Transition = {
	type: "spring",
	bounce: 0,
	visualDuration: 0.22,
};

/**
 * Used when motion is disabled (user preference or prefers-reduced-motion):
 * snaps to the target value with no animation.
 */
export const INSTANT: Transition = {
	duration: 0,
};

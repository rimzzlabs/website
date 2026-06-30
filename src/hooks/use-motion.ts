import { useStore } from "@nanostores/react";
import { useReducedMotion } from "motion/react";
import { $motionPreference } from "@/lib/stores/motion";

/** Whether the user has made an explicit motion choice. */
export function useHasChosenMotion() {
	return useStore($motionPreference) !== null;
}

/**
 * Effective motion-enabled boolean, combining the persisted preference with the
 * OS `prefers-reduced-motion` setting (the default when unchosen).
 */
export function useMotionEnabled() {
	const preference = useStore($motionPreference);
	const prefersReducedMotion = useReducedMotion();

	if (preference === "on") return true;
	if (preference === "off") return false;
	return !prefersReducedMotion;
}

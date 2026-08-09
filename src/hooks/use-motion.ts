import { useStore } from "@nanostores/react";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";
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

/**
 * Mirrors the effective preference onto `<html data-motion>`, which the view
 * transition script reads — it runs before any island can hydrate, so it cannot
 * use the store. First-paint application is handled by an inline script in the
 * document head (see app-layout.astro). Mount once (in the dock).
 */
export function useMotionSync() {
	const enabled = useMotionEnabled();

	useEffect(() => {
		document.documentElement.dataset.motion = enabled ? "on" : "off";
	}, [enabled]);
}

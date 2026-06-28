import { persistentAtom } from "@nanostores/persistent";
import { useStore } from "@nanostores/react";
import { useReducedMotion } from "motion/react";

export type MotionPreference = "on" | "off" | null;

/**
 * Persisted motion preference.
 *
 * - `"on"` / `"off"` — explicit user choice (wins over the OS setting).
 * - `null` — user hasn't chosen yet: fall back to the OS `prefers-reduced-motion`.
 *
 * Stored in localStorage under `motion-preference`. The preference-setting UI
 * (first-visit dialog, settings toggle) is intentionally not built yet, so this
 * stays `null` until that lands.
 */
export const $motionPreference = persistentAtom<MotionPreference>("motion-preference", null, {
	encode: (value) => value ?? "",
	decode: (value) => (value === "on" || value === "off" ? value : null),
});

/**
 * Whether the user has not yet made an explicit motion choice. Drives the
 * (deferred) first-visit prompt.
 */
export function useHasChosenMotion() {
	return useStore($motionPreference) !== null;
}

/**
 * Effective motion-enabled boolean, combining the persisted preference with the
 * OS `prefers-reduced-motion` setting (used as the default when unchosen).
 */
export function useMotionEnabled() {
	const preference = useStore($motionPreference);
	const prefersReducedMotion = useReducedMotion();

	if (preference === "on") return true;
	if (preference === "off") return false;
	return !prefersReducedMotion;
}

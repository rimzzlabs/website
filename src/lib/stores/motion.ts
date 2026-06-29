import { persistentAtom } from "@nanostores/persistent";

export type MotionPreference = "on" | "off" | null;

/**
 * Persisted motion preference.
 *
 * - `"on"` / `"off"` — explicit user choice (wins over the OS setting).
 * - `null` — user hasn't chosen yet: fall back to the OS `prefers-reduced-motion`.
 *
 * Stored in localStorage under `motion-preference`. Read it through the
 * `useMotionEnabled` / `useHasChosenMotion` hooks.
 */
export const $motionPreference = persistentAtom<MotionPreference>("motion-preference", null, {
	encode: (value) => value ?? "",
	decode: (value) => (value === "on" || value === "off" ? value : null),
});

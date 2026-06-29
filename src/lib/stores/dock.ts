import { persistentAtom } from "@nanostores/persistent";

export type DockPosition = "left" | "center" | "right";

/**
 * Persisted dock placement along the bottom edge. Set by dragging the dock to
 * one of the three bottom zones. Stored in localStorage under `dock-position`.
 * Read it through the `useDockPosition` hook.
 */
export const $dockPosition = persistentAtom<DockPosition>("dock-position", "center");

export function isDockPosition(value: unknown): value is DockPosition {
	return value === "left" || value === "center" || value === "right";
}

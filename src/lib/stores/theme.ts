import { persistentAtom } from "@nanostores/persistent";

export type Theme = "system" | "light" | "dark";

/**
 * Persisted theme preference. Stored in localStorage under `theme`.
 *
 * - `"light"` / `"dark"` — explicit override.
 * - `"system"` (default) — follow the OS `prefers-color-scheme`.
 *
 * First-paint application is handled by an inline script in the document head
 * (see app-layout.astro); the `useTheme` / `useThemeSync` hooks drive changes
 * after hydration.
 */
export const $theme = persistentAtom<Theme>("theme", "system");

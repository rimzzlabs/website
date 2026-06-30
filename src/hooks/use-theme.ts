import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { $theme, type Theme } from "@/lib/stores/theme";

function prefersDark() {
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
	const dark = theme === "dark" || (theme === "system" && prefersDark());
	document.documentElement.classList.toggle("dark", dark);
}

/** Reads the stored theme preference (not the resolved light/dark value). */
export function useTheme() {
	return useStore($theme);
}

/**
 * Keeps the `<html>` `.dark` class in sync with the stored theme, tracking OS
 * changes while the preference is `"system"`. Mount once (in the dock).
 */
export function useThemeSync() {
	const theme = useStore($theme);

	useEffect(() => {
		applyTheme(theme);
		if (theme !== "system") return;

		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyTheme("system");
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, [theme]);
}

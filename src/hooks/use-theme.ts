import { useCallback, useSyncExternalStore } from "react";

export function useTheme() {
	const subscribe = useCallback((onChange: () => void) => {
		const obs = new MutationObserver(onChange);
		obs.observe(document.documentElement, { attributeFilter: ["class"], attributes: true });

		return () => {
			obs.disconnect();
		};
	}, []);

	const getServerSnapShot = useCallback(() => {
		return null;
	}, []);

	const getSnapshot = useCallback(() => {
		return document.documentElement.classList.contains("dark") ? "dark" : "light";
	}, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapShot);
}

export function useSystemTheme() {
	const subscribe = useCallback((onChange: () => void) => {
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", onChange);

		return () => {
			window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", onChange);
		};
	}, []);

	const getServerSnapShot = useCallback(() => {
		return null;
	}, []);

	const getSnapshot = useCallback(() => {
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapShot);
}

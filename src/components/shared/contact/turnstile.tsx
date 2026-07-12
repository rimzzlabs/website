import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type TurnstileApi = {
	render: (
		el: HTMLElement,
		options: {
			sitekey: string;
			theme?: "auto" | "light" | "dark";
			callback?: (token: string) => void;
			"expired-callback"?: () => void;
			"error-callback"?: () => void;
		},
	) => string;
	remove: (id: string) => void;
};

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

let scriptPromise: Promise<void> | null = null;

/** Load the Turnstile script once, shared across widget mounts. */
function loadScript(): Promise<void> {
	if (window.turnstile) return Promise.resolve();
	if (scriptPromise) return scriptPromise;

	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load Turnstile"));
		document.head.appendChild(script);
	});
	return scriptPromise;
}

/** Cloudflare Turnstile widget; reports the verification token (empty on expiry/error). */
export function Turnstile({
	siteKey,
	onToken,
}: {
	siteKey: string;
	onToken: (token: string) => void;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const onTokenRef = useRef(onToken);
	onTokenRef.current = onToken;

	useEffect(() => {
		let widgetId: string | undefined;
		let cancelled = false;

		loadScript()
			.then(() => {
				if (cancelled || !containerRef.current || !window.turnstile) return;
				widgetId = window.turnstile.render(containerRef.current, {
					sitekey: siteKey,
					theme: "auto",
					callback: (token) => onTokenRef.current(token),
					"expired-callback": () => onTokenRef.current(""),
					"error-callback": () => onTokenRef.current(""),
				});
			})
			.catch(() => onTokenRef.current(""));

		return () => {
			cancelled = true;
			if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
		};
	}, [siteKey]);

	return <div ref={containerRef} className="min-h-[65px]" />;
}

import { PUBLIC_CF_TURNSTILE_SITE_KEY } from "astro:env/client";
import { useEffect, useRef, useState } from "react";

const SCRIPT_SRC =
	"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TOKEN_TIMEOUT_MS = 30_000;

interface TurnstileOptions {
	sitekey: string;
	appearance: "always" | "execute" | "interaction-only";
	theme: "auto" | "light" | "dark";
	"refresh-expired": "auto" | "manual" | "never";
	callback: (token: string) => void;
	"expired-callback": () => void;
	"error-callback": () => void;
	"before-interactive-callback": () => void;
	"after-interactive-callback": () => void;
}

interface TurnstileApi {
	render: (element: HTMLElement, options: TurnstileOptions) => string;
	reset: (widgetId: string) => void;
	remove: (widgetId: string) => void;
}

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

let scriptPromise: Promise<void> | null = null;

function loadScript() {
	if (window.turnstile) return Promise.resolve();
	if (scriptPromise) return scriptPromise;

	scriptPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = SCRIPT_SRC;
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load Turnstile"));
		document.head.appendChild(script);
	});
	return scriptPromise;
}

interface UseTurnstileParams {
	enabled: boolean;
}

export function useTurnstile(params: UseTurnstileParams) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | null>(null);
	const tokenRef = useRef("");
	const waitersRef = useRef<Array<(token: string) => void>>([]);
	const [interactive, setInteractive] = useState(false);

	useEffect(() => {
		if (!params.enabled || !PUBLIC_CF_TURNSTILE_SITE_KEY) return;
		let cancelled = false;

		const settle = (token: string) => {
			tokenRef.current = token;
			for (const resolve of waitersRef.current) resolve(token);
			waitersRef.current = [];
		};

		loadScript()
			.then(() => {
				if (cancelled || !containerRef.current || !window.turnstile) return;
				widgetIdRef.current = window.turnstile.render(containerRef.current, {
					sitekey: PUBLIC_CF_TURNSTILE_SITE_KEY ?? "",
					appearance: "interaction-only",
					theme: "auto",
					"refresh-expired": "auto",
					callback: settle,
					"expired-callback": () => {
						tokenRef.current = "";
					},
					"error-callback": () => settle(""),
					"before-interactive-callback": () => setInteractive(true),
					"after-interactive-callback": () => setInteractive(false),
				});
			})
			.catch(() => settle(""));

		return () => {
			cancelled = true;
			if (widgetIdRef.current && window.turnstile) {
				window.turnstile.remove(widgetIdRef.current);
			}
			widgetIdRef.current = null;
			tokenRef.current = "";
		};
	}, [params.enabled]);

	const getToken = () => {
		if (tokenRef.current) return Promise.resolve(tokenRef.current);
		return new Promise<string>((resolve) => {
			waitersRef.current.push(resolve);
			setTimeout(() => resolve(""), TOKEN_TIMEOUT_MS);
		});
	};

	const reset = () => {
		tokenRef.current = "";
		if (widgetIdRef.current && window.turnstile) {
			window.turnstile.reset(widgetIdRef.current);
		}
	};

	return { containerRef, interactive, getToken, reset };
}

import { type ReactNode, useEffect, useRef, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { isMotionReduced } from "@/lib/motion";

interface HomeOriginSceneProps {
	label: string;
	// Server-rendered stills of the scene. They show before the canvas is
	// ready, and instead of it when JavaScript is off.
	children?: ReactNode;
}

// Waits for a quiet moment, so building the scene never competes with the
// page load. Safari has no requestIdleCallback, so it gets a short delay.
function whenIdle() {
	return new Promise<void>((resolve) => {
		if ("requestIdleCallback" in window)
			window.requestIdleCallback(() => resolve(), { timeout: 3000 });
		else setTimeout(resolve, 300);
	});
}

export function HomeOriginScene(props: HomeOriginSceneProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [ready, setReady] = useState(false);

	// Three.js is loaded only after this island hydrates (client:visible) and
	// the browser is idle, in its own chunk. A skeleton, then the placeholder
	// stills, stand in until then.
	useEffect(() => {
		const container = containerRef.current;
		const canvas = canvasRef.current;
		if (!container || !canvas) return;

		let cancelled = false;
		let teardown = () => {};

		const detail = window.matchMedia("(max-width: 639px)").matches ? 0.5 : 1;

		whenIdle()
			.then(() => import("./scene/pulosari-scene"))
			.then((module) =>
				cancelled ? null : module.createPulosariScene({ canvas, detail }),
			)
			.then((result) => {
				if (!result?.ok) return;
				const scene = result.value;
				// Unmounted while it was building: throw the scene away.
				if (cancelled) {
					scene.dispose();
					return;
				}
				const root = document.documentElement;
				let onScreen = false;
				let playing = false;

				const sync = () => {
					playing =
						onScreen &&
						document.visibilityState === "visible" &&
						!isMotionReduced();
					if (playing) scene.start();
					else {
						scene.stop();
						scene.render();
					}
				};

				// The scene follows the site theme: day in light mode, night in
				// dark mode. A running scene fades between them; a still one jumps.
				const followTheme = () => {
					scene.setNight(root.classList.contains("dark"), !playing);
					if (!playing) scene.render();
				};
				scene.setNight(root.classList.contains("dark"), true);

				const resize = new ResizeObserver((entries) => {
					const box = entries[0].contentRect;
					scene.resize(box.width, box.height);
					scene.render();
				});
				const visibility = new IntersectionObserver((entries) => {
					onScreen = entries[0].isIntersecting;
					sync();
				});
				const settings = new MutationObserver(() => {
					sync();
					followTheme();
				});

				resize.observe(container);
				visibility.observe(container);
				settings.observe(root, { attributeFilter: ["data-motion", "class"] });
				document.addEventListener("visibilitychange", sync);
				requestAnimationFrame(() => setReady(true));

				teardown = () => {
					resize.disconnect();
					visibility.disconnect();
					settings.disconnect();
					document.removeEventListener("visibilitychange", sync);
					scene.dispose();
				};
			});

		return () => {
			cancelled = true;
			teardown();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			role="img"
			aria-label={props.label}
			className="relative aspect-4/3 w-full overflow-hidden sm:aspect-video"
		>
			<Skeleton className="absolute inset-0 rounded-none" />
			{props.children}
			<canvas
				ref={canvasRef}
				data-ready={ready}
				className="absolute inset-0 size-full opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
			/>
		</div>
	);
}

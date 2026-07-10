import type React from "react";
import { useEffect, useId, useRef, useState } from "react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	cx?: number;
	cy?: number;
	cr?: number;
	className?: string;
	glow?: boolean;
}

/**
 * Dots that pulse in glow mode. A fixed count (not one per grid cell) so the
 * animation cost stays constant on any viewport; the pulse itself is pure CSS,
 * keeping the main thread idle for Lighthouse's quiescence check.
 */
const TWINKLE_COUNT = 60;

/** Animated/static SVG dot-pattern background; the glow pulse respects the motion preference. */
export function DotPattern({
	width = 16,
	height = 16,
	cx = 1,
	cy = 1,
	cr = 1,
	className,
	glow = false,
	...props
}: DotPatternProps) {
	const id = useId();
	const containerRef = useRef<SVGSVGElement>(null);
	const motionEnabled = useMotionEnabled();
	const animateGlow = glow && motionEnabled;
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		function updateDimensions() {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				setDimensions({ width: rect.width, height: rect.height });
			}
		}

		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const cols = Math.ceil(dimensions.width / width);
	const rows = Math.ceil(dimensions.height / height);
	const cells = cols * rows;
	const twinkleCells = new Set<number>();
	if (animateGlow && cells > 0) {
		while (twinkleCells.size < Math.min(TWINKLE_COUNT, cells)) {
			twinkleCells.add(Math.floor(Math.random() * cells));
		}
	}
	const twinkles = [...twinkleCells].map((cell) => ({
		x: (cell % cols) * width + cx,
		y: Math.floor(cell / cols) * height + cy,
		delay: Math.random() * 5,
		duration: Math.random() * 3 + 2,
	}));

	return (
		<svg
			ref={containerRef}
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
				className,
			)}
			{...props}
		>
			<defs>
				<radialGradient id={`${id}-gradient`}>
					<stop offset="0%" stopColor="currentColor" stopOpacity="1" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="0" />
				</radialGradient>
				<pattern id={`${id}-pattern`} width={width} height={height} patternUnits="userSpaceOnUse">
					<circle cx={cx} cy={cy} r={cr} fill={glow ? `url(#${id}-gradient)` : "currentColor"} />
				</pattern>
			</defs>
			<rect width="100%" height="100%" fill={`url(#${id}-pattern)`} />
			{twinkles.map((dot) => (
				<circle
					key={`${dot.x}-${dot.y}`}
					cx={dot.x}
					cy={dot.y}
					r={cr}
					fill={`url(#${id}-gradient)`}
					className="dot-twinkle"
					style={{ animationDelay: `${dot.delay}s`, animationDuration: `${dot.duration}s` }}
				/>
			))}
		</svg>
	);
}

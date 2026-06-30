import { motion } from "motion/react";
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
	const dots = Array.from({ length: cols * rows }, (_, i) => {
		const col = i % cols;
		const row = Math.floor(i / cols);
		return {
			x: col * width + cx,
			y: row * height + cy,
			delay: Math.random() * 5,
			duration: Math.random() * 3 + 2,
		};
	});

	return (
		<svg
			ref={containerRef}
			aria-hidden="true"
			className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
			{...props}
		>
			<defs>
				<radialGradient id={`${id}-gradient`}>
					<stop offset="0%" stopColor="currentColor" stopOpacity="1" />
					<stop offset="100%" stopColor="currentColor" stopOpacity="0" />
				</radialGradient>
			</defs>
			{dots.map((dot) => (
				<motion.circle
					key={`${dot.x}-${dot.y}`}
					cx={dot.x}
					cy={dot.y}
					r={cr}
					fill={glow ? `url(#${id}-gradient)` : "currentColor"}
					className="text-neutral-400/80"
					initial={glow ? { opacity: 0.4, scale: 1 } : {}}
					animate={animateGlow ? { opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] } : {}}
					transition={
						animateGlow
							? {
									duration: dot.duration,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "reverse",
									delay: dot.delay,
									ease: "easeInOut",
								}
							: {}
					}
				/>
			))}
		</svg>
	);
}

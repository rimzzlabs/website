import { HeartIcon } from "@phosphor-icons/react";
import type { CSSProperties } from "react";

// Twelve particles, spaced evenly around the heart with a little jitter:
// small hearts and dots in warm colors that fly out and fade.
const PARTICLES = Array.from({ length: 12 }, (_, index) => {
	const angle = (index / 12) * Math.PI * 2 + (index % 3) * 0.18;
	const distance = 34 + (index % 4) * 7;
	return {
		id: index,
		heart: index % 2 === 0,
		color: [
			"text-rose-500",
			"text-pink-400",
			"text-amber-400",
			"text-orange-400",
		][index % 4],
		style: {
			"--x": `${Math.cos(angle) * distance}px`,
			"--y": `${Math.sin(angle) * distance - 6}px`,
			"--s": `${0.7 + (index % 3) * 0.2}`,
			"--r": `${(index % 2 === 0 ? 1 : -1) * (20 + index * 9)}deg`,
		} as CSSProperties,
	};
});

export function NoteReactionBurst() {
	return (
		<span aria-hidden="true" className="pointer-events-none absolute inset-0">
			<span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-heart-ring" />
			{PARTICLES.map((particle) => (
				<span
					key={particle.id}
					style={particle.style}
					className={`absolute top-1/2 left-1/2 -mt-1.5 -ml-1.5 size-3 animate-heart-particle ${particle.color}`}
				>
					{particle.heart ? (
						<HeartIcon weight="fill" className="size-3" />
					) : (
						<span className="block size-1.5 translate-x-0.5 translate-y-0.5 rounded-full bg-current" />
					)}
				</span>
			))}
		</span>
	);
}

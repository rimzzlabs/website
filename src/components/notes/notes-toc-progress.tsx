import { useTocProgress } from "@/hooks/use-toc-progress";

export function NotesTocProgress({ inView }: { inView: string }) {
	const [top, height] = useTocProgress(inView);

	return (
		<div
			className="absolute -left-0.5 top-0 w-1 bg-orange-500 transition duration-300 ease-out"
			style={{ transform: `translateY(${top}px)`, height }}
		/>
	);
}

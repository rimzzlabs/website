import { closestCenter } from "@dnd-kit/collision";
import { useDroppable } from "@dnd-kit/react";
import type { DockPosition } from "@/lib/stores/dock";
import { cn } from "@/lib/utils";

/** Invisible snap target spanning one third of the bottom edge. */
export function DockZone({ id, className }: { id: DockPosition; className?: string }) {
	const { ref } = useDroppable({ id, collisionDetector: closestCenter });
	return (
		<div
			ref={ref}
			aria-hidden="true"
			className={cn("pointer-events-none absolute bottom-0 h-full w-1/3", className)}
		/>
	);
}

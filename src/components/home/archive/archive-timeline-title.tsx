import { motion } from "motion/react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { INSTANT, SPRING } from "@/lib/motion";
import { useAccordionItemOpen } from "../../ui/accordion";

/** Title shared (via `layoutId`) between the trigger and the open panel heading. */
function SharedTitle({ year, title }: { year: number; title: string }) {
	const motionEnabled = useMotionEnabled();
	return (
		<motion.span
			layoutId={`archive-title-${year}`}
			transition={motionEnabled ? SPRING : INSTANT}
			className="inline-block"
		>
			{title}
		</motion.span>
	);
}

/** The `, Title` shown next to the year in the trigger while the item is closed. */
export function TriggerTitle({ year, title }: { year: number; title: string }) {
	const open = useAccordionItemOpen();
	if (open) return null;
	return (
		<span aria-hidden>
			{", "}
			<SharedTitle year={year} title={title} />
		</span>
	);
}

/** The panel heading shown while the item is open; the title flies here from the trigger. */
export function ContentTitle({ year, title }: { year: number; title: string }) {
	const open = useAccordionItemOpen();
	if (!open) return null;
	return (
		<h4 className="text-lg font-semibold pb-4 sticky top-0">
			<SharedTitle year={year} title={title} />
		</h4>
	);
}

import { motion } from "motion/react";
import { useMotionEnabled } from "@/hooks/use-motion";
import { INSTANT, SPRING } from "@/lib/motion";
import { useAccordionItemOpen } from "../../ui/accordion";

/** When opening, paragraphs fade in after the title; each one staggers by this much. */
const PARA_BASE = 0.35;
const PARA_STAGGER = 0.06;

export function ArchiveDescriptions({ items }: { items: Array<string> }) {
	const open = useAccordionItemOpen();
	const motionEnabled = useMotionEnabled();

	return (
		<>
			{items.map((description, index) => (
				<motion.p
					key={description}
					initial={false}
					animate={{ opacity: open ? 1 : 0, y: open ? 0 : 8 }}
					transition={
						motionEnabled
							? { ...SPRING, delay: open ? PARA_BASE + index * PARA_STAGGER : 0 }
							: INSTANT
					}
				>
					{description}
				</motion.p>
			))}
		</>
	);
}

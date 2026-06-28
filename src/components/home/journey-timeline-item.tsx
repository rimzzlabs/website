import { motion } from "motion/react";
import { INSTANT, SPRING } from "@/lib/motion";
import { useMotionEnabled } from "@/lib/stores/motion";
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	useAccordionItemOpen,
} from "../ui/accordion";

interface TProps {
	year: number;
	title: string;
	descriptions: Array<string>;
}

/** When opening, paragraphs start fading in after the title; each one staggers by this much. */
const PARA_BASE = 0.35;
const PARA_STAGGER = 0.06;

/**
 * The title text shared (via `layoutId`) between the trigger and the panel. When
 * the item opens, motion flies it from the trigger heading down into the content.
 */
function SharedTitle({ year, title }: { year: number; title: string }) {
	const motionEnabled = useMotionEnabled();
	return (
		<motion.span
			layoutId={`journey-title-${year}`}
			transition={motionEnabled ? SPRING : INSTANT}
			className="inline-block"
		>
			{title}
		</motion.span>
	);
}

function TriggerTitle({ year, title }: { year: number; title: string }) {
	const open = useAccordionItemOpen();
	if (open) return null;
	return (
		<span aria-hidden>
			{", "}
			<SharedTitle year={year} title={title} />
		</span>
	);
}

function ContentTitle({ year, title }: { year: number; title: string }) {
	const open = useAccordionItemOpen();
	if (!open) return null;
	return (
		<h4 className="text-lg font-semibold pb-4 sticky top-0">
			<SharedTitle year={year} title={title} />
		</h4>
	);
}

function Descriptions({ items }: { items: Array<string> }) {
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

export function JourneyTimelineItem(props: TProps) {
	return (
		<AccordionItem
			value={props.year}
			className="relative before:absolute before:w-5 before:h-0.5 before:bg-neutral-300 before:left-0 before:top-7.5 border-none"
		>
			<AccordionTrigger className="group py-4 text-xl font-semibold sticky top-0 pl-6 pr-4">
				<span className="text-muted-foreground">{props.year}</span>{" "}
				<span className="sr-only">{props.title}</span>
				<TriggerTitle year={props.year} title={props.title} />
			</AccordionTrigger>

			<AccordionContent className="pl-6">
				<ContentTitle year={props.year} title={props.title} />
				<Descriptions items={props.descriptions} />
			</AccordionContent>

			<div
				aria-hidden
				className="absolute -left-1.5 top-[1.4688rem] size-3.5 rounded-xl border-2 border-neutral-300 bg-background"
			/>
		</AccordionItem>
	);
}

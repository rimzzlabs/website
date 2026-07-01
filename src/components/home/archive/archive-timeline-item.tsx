import { useMotionEnabled } from "@/hooks/use-motion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { ArchiveDescriptions } from "./archive-descriptions";
import { ArchivePhotos, type Photo } from "./archive-photos";
import { ContentTitle, TriggerTitle } from "./archive-timeline-title";

interface ArchiveTimelineItemProps {
	year: number;
	title: string;
	descriptions: Array<string>;
	photos: Array<Photo>;
}

export function ArchiveTimelineItem(props: ArchiveTimelineItemProps) {
	const motionEnabled = useMotionEnabled();

	return (
		<AccordionItem
			value={props.year}
			className="group relative before:absolute before:w-5 before:h-0.5 before:bg-taupe-300 dark:before:bg-taupe-800 before:left-0 before:top-7.5 border-none"
		>
			<AccordionTrigger className="group py-4 text-xl font-semibold sticky top-0 pl-6 pr-4">
				<span className="text-muted-foreground">{props.year}</span>{" "}
				<span className="sr-only">{props.title}</span>
				<TriggerTitle year={props.year} title={props.title} />
			</AccordionTrigger>

			<AccordionContent className="pl-6">
				<ContentTitle year={props.year} title={props.title} />
				{props.photos.length > 0 ? (
					<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start">
						<div>
							<ArchiveDescriptions items={props.descriptions} />
						</div>
						<ArchivePhotos photos={props.photos} label={`${props.year}, ${props.title}`} />
					</div>
				) : (
					<ArchiveDescriptions items={props.descriptions} />
				)}
			</AccordionContent>

			<span
				aria-hidden
				data-safe-motion={motionEnabled}
				className="absolute -left-2.25 top-5.25 hidden size-5 rounded-full bg-orange-500/75 group-first-of-type:block group-first-of-type:data-[safe-motion=true]:animate-ping"
			/>

			<div
				aria-hidden
				data-safe-motion={motionEnabled}
				className="absolute -left-1.5 top-[1.4688rem] size-3.5 rounded-xl border-2 border-taupe-300 dark:border-taupe-800 bg-background group-first-of-type:bg-orange-500 group-first-of-type:data-[safe-motion=true]:animate-in"
			/>
		</AccordionItem>
	);
}

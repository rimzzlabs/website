import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { Accordion } from "../../ui/accordion";
import type { OptimizedImage } from "./archive-images";
import { ArchiveTimelineItem } from "./archive-timeline-item";

export function ArchiveTimeline({
	lang,
	images,
}: {
	lang: Lang;
	images: Record<number, Array<OptimizedImage>>;
}) {
	const timeline = getDictionary(lang).archive.timeline;
	const years = Object.keys(timeline)
		.map(Number)
		.sort((a, b) => b - a);

	return (
		<Accordion
			multiple
			className="relative before:absolute before:left-0 before:top-7.5 before:bottom-7.5 before:w-0.5 before:bg-taupe-300 dark:before:bg-taupe-800"
		>
			{years.map((year) => {
				const entry = timeline[String(year) as keyof typeof timeline];
				const photos = (images[year] ?? []).map((image, i) => ({
					...image,
					alt: entry.photoAlts[i] ?? "",
				}));
				return (
					<ArchiveTimelineItem
						key={year}
						year={year}
						title={entry.title}
						descriptions={entry.descriptions}
						photos={photos}
					/>
				);
			})}
		</Accordion>
	);
}

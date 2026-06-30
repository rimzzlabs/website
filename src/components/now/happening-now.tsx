import { useMotionEnabled } from "@/hooks/use-motion";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { dateToISO, formatDate } from "@/lib/date";

export function HappeningNow({ lang }: { lang: Lang }) {
	const motionEnabled = useMotionEnabled();
	const items = getDictionary(lang).now.items;
	const sorted = Object.entries(items).sort(
		([a], [b]) => new Date(b).getTime() - new Date(a).getTime(),
	);

	return (
		<ul className="relative before:absolute before:top-3 before:bottom-3 before:left-0 before:w-0.5 before:bg-taupe-300 dark:before:bg-taupe-800">
			{sorted.map(([date, item]) => (
				<li
					key={date}
					className="group relative pl-6 not-last:pb-10 before:absolute before:top-2.75 before:left-0 before:h-0.5 before:w-5 before:bg-taupe-300 dark:before:bg-taupe-800"
				>
					<span
						aria-hidden
						data-safe-motion={motionEnabled}
						className="absolute -left-2.25 top-0.5 hidden size-5 rounded-full bg-orange-500/75 group-first-of-type:block group-first-of-type:data-[safe-motion=true]:animate-ping"
					/>
					<span
						aria-hidden
						className="absolute -left-1.5 top-1.25 size-3.5 rounded-xl border-2 border-taupe-300 bg-background group-first-of-type:border-orange-500 group-first-of-type:bg-orange-500 dark:border-taupe-800"
					/>

					<p className="text-xs font-light text-muted-foreground sm:text-sm">
						<time dateTime={dateToISO(date)}>{formatDate(date, lang)}</time>
					</p>
					<h2 className="pt-1 text-lg font-semibold tracking-tight text-balance sm:text-xl">
						{item.title}
					</h2>
					<p className="max-w-2xl pt-1 text-sm text-muted-foreground">{item.description}</p>
				</li>
			))}
		</ul>
	);
}

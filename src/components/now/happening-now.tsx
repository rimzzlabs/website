import { useMotionEnabled } from "@/hooks/use-motion";
import { dateToISO, formatDate } from "@/lib/date";

const now = [
	{
		date: "2025-12-02",
		title: "Building something related with AI",
		description:
			"Currently building something related with AI at Kolosal AI, the people here are amazing. I expect I'll write some notes about it down the line.",
	},
];

export function HappeningNow() {
	const motionEnabled = useMotionEnabled();
	const sorted = [...now].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<ul className="relative before:absolute before:top-3 before:bottom-3 before:left-0 before:w-0.5 before:bg-taupe-300 dark:before:bg-taupe-800">
			{sorted.map((item) => (
				<li
					key={item.date}
					className="group relative pl-6 not-last:pb-10 before:absolute before:top-3 before:left-0 before:h-0.5 before:w-5 before:bg-taupe-300 dark:before:bg-taupe-800"
				>
					<span
						aria-hidden
						data-safe-motion={motionEnabled}
						className="absolute -left-2.25 top-[0.125rem] hidden size-5 rounded-full bg-orange-500/75 group-first-of-type:block group-first-of-type:data-[safe-motion=true]:animate-ping"
					/>
					<span
						aria-hidden
						className="absolute -left-1.5 top-[0.3125rem] size-3.5 rounded-xl border-2 border-taupe-300 bg-background group-first-of-type:border-orange-500 group-first-of-type:bg-orange-500 dark:border-taupe-800"
					/>

					<p className="text-xs font-light text-muted-foreground sm:text-sm">
						<time dateTime={dateToISO(item.date)}>{formatDate(item.date)}</time>
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

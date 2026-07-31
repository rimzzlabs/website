import { cn } from "@/lib/utils";

export function GuestbookSkeleton() {
	return (
		<div className={cn("flex flex-col gap-3 overflow-hidden h-full")}>
			{[0, 1, 2].map((row) => (
				<div
					className="flex flex-col gap-2 rounded-lg border border-l-4 border-l-primary/20 p-4 sm:p-5"
					key={row}
				>
					<div className="h-3 w-full animate-pulse rounded bg-muted/60" />
					<div className="h-3 w-3/4 animate-pulse rounded bg-muted/60" />
					<div className="mt-1 h-4 w-32 animate-pulse rounded bg-muted" />
				</div>
			))}
		</div>
	);
}

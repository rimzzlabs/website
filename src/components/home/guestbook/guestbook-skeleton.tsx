import { cn } from "@/lib/utils";
import { PANEL_HEIGHT } from "./guestbook-constants";

export function GuestbookSkeleton() {
	return (
		<div className={cn(PANEL_HEIGHT, "flex flex-col gap-6 overflow-hidden py-4")}>
			{[0, 1, 2, 3].map((row) => (
				<div className="flex flex-col gap-2" key={row}>
					<div className="h-4 w-32 animate-pulse rounded bg-muted" />
					<div className="h-3 w-full animate-pulse rounded bg-muted/60" />
					<div className="h-3 w-3/4 animate-pulse rounded bg-muted/60" />
				</div>
			))}
		</div>
	);
}

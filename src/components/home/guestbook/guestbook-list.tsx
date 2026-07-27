import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { GuestbookComment } from "@/lib/guestbook-schema";
import { PANEL_HEIGHT } from "./guestbook-constants";
import { GuestbookItem } from "./guestbook-item";

type GuestbookListProps = {
	lang: Lang;
	items: GuestbookComment[];
	hasMore: boolean;
	loadingMore: boolean;
	onLoadMore: () => void;
};

export function GuestbookList(props: GuestbookListProps) {
	const t = getDictionary(props.lang).guestbook;
	const sentinelRef = useInfiniteScroll(props.onLoadMore, props.hasMore && !props.loadingMore);

	return (
		<ScrollArea className={PANEL_HEIGHT} data-scroll-fade="true">
			<ul className="divide-y" aria-label={t.heading} aria-busy={props.loadingMore}>
				{props.items.map((comment) => (
					<li key={comment.id}>
						<GuestbookItem lang={props.lang} comment={comment} />
					</li>
				))}
			</ul>

			{props.loadingMore && (
				<div className="flex justify-center py-3 text-muted-foreground">
					<LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
				</div>
			)}
			{props.hasMore && <div ref={sentinelRef} className="h-8" aria-hidden="true" />}
		</ScrollArea>
	);
}

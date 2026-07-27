import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { Lang } from "@/i18n/config";
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
	const sentinelRef = useInfiniteScroll(props.onLoadMore, props.hasMore && !props.loadingMore);

	return (
		<ScrollArea className={PANEL_HEIGHT} data-scroll-fade="true">
			<div className="divide-y">
				{props.items.map((comment) => (
					<GuestbookItem key={comment.id} lang={props.lang} comment={comment} />
				))}
			</div>

			{props.loadingMore && (
				<div className="flex justify-center py-3 text-muted-foreground">
					<LoaderCircle className="size-4 animate-spin" />
				</div>
			)}
			{props.hasMore && <div ref={sentinelRef} className="h-8" />}
		</ScrollArea>
	);
}

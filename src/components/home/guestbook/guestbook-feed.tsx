import { QueryClientProvider } from "@tanstack/react-query";
import { useGuestbookFeed } from "@/hooks/use-guestbook-feed";
import type { Lang } from "@/i18n/config";
import type { GuestbookPage } from "@/lib/guestbook-schema";
import { getQueryClient } from "@/lib/query-client";
import { GuestbookEmpty } from "./guestbook-empty";
import { GuestbookError } from "./guestbook-error";
import { GuestbookList } from "./guestbook-list";
import { GuestbookSkeleton } from "./guestbook-skeleton";

type GuestbookFeedProps = { lang: Lang; initialPage?: GuestbookPage };

export function GuestbookFeed(props: GuestbookFeedProps) {
	return (
		<QueryClientProvider client={getQueryClient()}>
			<GuestbookFeedStates lang={props.lang} initialPage={props.initialPage} />
		</QueryClientProvider>
	);
}

function GuestbookFeedStates(props: GuestbookFeedProps) {
	const query = useGuestbookFeed();
	const seeded = props.initialPage;
	const items = query.data ?? seeded?.items ?? [];
	const hasMore = query.data ? query.hasNextPage : false;

	if (query.status === "pending" && !seeded) return <GuestbookSkeleton />;
	if (query.status === "error" && !seeded)
		return <GuestbookError lang={props.lang} onRetry={() => query.refetch()} />;
	if (items.length === 0) return <GuestbookEmpty lang={props.lang} />;

	return (
		<GuestbookList
			lang={props.lang}
			items={items}
			hasMore={hasMore}
			loadingMore={query.isFetchingNextPage}
			onLoadMore={() => query.fetchNextPage()}
		/>
	);
}

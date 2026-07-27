import { QueryClientProvider } from "@tanstack/react-query";
import { useGuestbookFeed } from "@/hooks/use-guestbook-feed";
import type { Lang } from "@/i18n/config";
import { getQueryClient } from "@/lib/query-client";
import { GuestbookEmpty } from "./guestbook-empty";
import { GuestbookError } from "./guestbook-error";
import { GuestbookList } from "./guestbook-list";
import { GuestbookSkeleton } from "./guestbook-skeleton";

type GuestbookFeedProps = { lang: Lang };

export function GuestbookFeed(props: GuestbookFeedProps) {
	return (
		<QueryClientProvider client={getQueryClient()}>
			<GuestbookFeedStates lang={props.lang} />
		</QueryClientProvider>
	);
}

function GuestbookFeedStates(props: GuestbookFeedProps) {
	const query = useGuestbookFeed();
	const items = query.data ?? [];

	if (query.status === "pending") return <GuestbookSkeleton />;
	if (query.status === "error")
		return <GuestbookError lang={props.lang} onRetry={() => query.refetch()} />;
	if (items.length === 0) return <GuestbookEmpty lang={props.lang} />;

	return (
		<GuestbookList
			lang={props.lang}
			items={items}
			hasMore={query.hasNextPage}
			loadingMore={query.isFetchingNextPage}
			onLoadMore={() => query.fetchNextPage()}
		/>
	);
}

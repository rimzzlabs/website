import { QueryClientProvider } from "@tanstack/react-query";
import { match, P } from "ts-pattern";
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
	const hasMore = query.data ? query.hasNextPage : false;

	return match(seeded)
		.with(P.not(P.nullish), ({ items }) =>
			match(items.length)
				.with(P.number.gt(0), () => (
					<GuestbookList
						lang={props.lang}
						hasMore={hasMore}
						items={query.data ?? items}
						loadingMore={query.isFetchingNextPage}
						onLoadMore={() => query.fetchNextPage()}
					/>
				))
				.otherwise(() => <GuestbookEmpty lang={props.lang} />),
		)
		.otherwise(() => {
			return match(query)
				.with({ status: "pending" }, () => <GuestbookSkeleton />)
				.with({ status: "error" }, () => (
					<GuestbookError lang={props.lang} onRetry={() => query.refetch()} />
				))
				.with({ status: "success", data: P.select() }, (items) =>
					match(items.length)
						.with(P.number.gt(0), () => (
							<GuestbookList
								lang={props.lang}
								items={items}
								hasMore={hasMore}
								loadingMore={query.isFetchingNextPage}
								onLoadMore={() => query.fetchNextPage()}
							/>
						))
						.otherwise(() => <GuestbookEmpty lang={props.lang} />),
				)
				.exhaustive();
		});
}

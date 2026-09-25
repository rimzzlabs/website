import { ArrowDownIcon } from "@phosphor-icons/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { GuestbookEntry } from "@/components/guestbook/guestbook-entry";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGuestbookPage, GUESTBOOK_QUERY_KEY } from "@/lib/guestbook/api";
import type { GuestbookPage } from "@/lib/guestbook/schema";
import { getQueryClient } from "@/lib/query-client";

const SKELETON_ROWS = ["first", "second", "third"];

function toInitialData(page: GuestbookPage) {
	if (page.items.length === 0) return undefined;
	return { pages: [page], pageParams: [null] };
}

interface GuestbookEntriesProps {
	initialPage: GuestbookPage;
}

export function GuestbookEntries(props: GuestbookEntriesProps) {
	const query = useInfiniteQuery(
		{
			queryKey: GUESTBOOK_QUERY_KEY,
			queryFn: (context) => fetchGuestbookPage(context.pageParam),
			initialPageParam: null as number | null,
			initialData: toInitialData(props.initialPage),
			initialDataUpdatedAt: 0,
			getNextPageParam: (page) => page.nextCursor ?? undefined,
		},
		getQueryClient(),
	);

	if (query.isPending) {
		return (
			<ul aria-busy="true" aria-label="Loading entries">
				{SKELETON_ROWS.map((row) => (
					<li key={row} className="flex gap-3 border-b py-4 first:border-t">
						<Skeleton className="size-8 rounded-full" />
						<div className="flex flex-1 flex-col gap-2">
							<Skeleton className="h-3 w-1/3" />
							<Skeleton className="h-3 w-5/6" />
						</div>
					</li>
				))}
			</ul>
		);
	}

	if (query.isError) {
		return (
			<p role="alert" className="border-y py-4 text-sm text-muted-foreground">
				The guestbook did not load. Please refresh the page.
			</p>
		);
	}

	const entries = query.data.pages.flatMap((page) => page.items);

	if (entries.length === 0) {
		return (
			<p className="border-y py-4 text-sm text-muted-foreground">
				No entries yet. Be the first to sign it.
			</p>
		);
	}

	return (
		<ul>
			{entries.map((entry) => (
				<GuestbookEntry key={entry.id} entry={entry} />
			))}
			{query.hasNextPage && (
				<li className="border-b">
					<button
						type="button"
						disabled={query.isFetchingNextPage}
						onClick={() => query.fetchNextPage()}
						className="group/more inline-flex w-full items-center gap-1.5 py-3 font-serif text-[1.05em] font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-60"
					>
						{query.isFetchingNextPage ? "Loading…" : "Show more entries"}
						<ArrowDownIcon
							aria-hidden="true"
							className="size-4 transition group-hover/more:translate-y-0.5"
						/>
					</button>
				</li>
			)}
		</ul>
	);
}

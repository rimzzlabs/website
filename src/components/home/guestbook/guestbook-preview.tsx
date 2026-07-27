import { QueryClientProvider } from "@tanstack/react-query";
import { useGuestbookPreview } from "@/hooks/use-guestbook-preview";
import type { Lang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import type { GuestbookComment } from "@/lib/guestbook-schema";
import { getQueryClient } from "@/lib/query-client";
import { GuestbookItem } from "./guestbook-item";

const PREVIEW_LIMIT = 5;

type GuestbookPreviewProps = { lang: Lang; comments?: GuestbookComment[] };

export function GuestbookPreview(props: GuestbookPreviewProps) {
	return (
		<QueryClientProvider client={getQueryClient()}>
			<GuestbookPreviewList lang={props.lang} comments={props.comments} />
		</QueryClientProvider>
	);
}

function GuestbookPreviewList(props: GuestbookPreviewProps) {
	const t = getDictionary(props.lang).guestbook;
	const query = useGuestbookPreview(PREVIEW_LIMIT);
	const seeded = props.comments;
	const items = query.data ?? seeded ?? [];

	if (query.status === "pending" && !seeded) {
		return (
			<div className="flex flex-col gap-6 py-2">
				{[0, 1, 2].map((row) => (
					<div className="flex flex-col gap-2" key={row}>
						<div className="h-4 w-32 animate-pulse rounded bg-muted" />
						<div className="h-3 w-full animate-pulse rounded bg-muted/60" />
						<div className="h-3 w-3/4 animate-pulse rounded bg-muted/60" />
					</div>
				))}
			</div>
		);
	}

	if (query.status === "error" && !seeded) {
		return <p className="py-4 text-sm text-muted-foreground">{t.loadError}</p>;
	}

	if (items.length === 0) {
		return <p className="py-4 text-sm text-muted-foreground">{t.empty.description}</p>;
	}

	return (
		<ul className="divide-y" aria-label={t.heading}>
			{items.map((comment) => (
				<li key={comment.id}>
					<GuestbookItem lang={props.lang} comment={comment} readOnly />
				</li>
			))}
		</ul>
	);
}

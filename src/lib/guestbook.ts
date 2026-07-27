import { type InfiniteData, infiniteQueryOptions } from "@tanstack/react-query";
import {
	type GuestbookComment,
	type GuestbookEditInput,
	type GuestbookInput,
	type GuestbookPage,
	type GuestbookVerifiedInput,
	guestbookCommentSchema,
	guestbookPageSchema,
} from "./guestbook-schema";

const ENDPOINT = "/api/guestbook";
const PAGE_SIZE = 10;

export const guestbookKeys = {
	all: ["guestbook"] as const,
	feed: () => [...guestbookKeys.all, "feed"] as const,
	preview: (limit: number) => [...guestbookKeys.all, "preview", limit] as const,
};

export async function fetchRecentComments(limit: number): Promise<GuestbookComment[]> {
	const res = await fetch(`${ENDPOINT}?offset=0&limit=${limit}`);
	if (!res.ok) throw new Error("guestbook_load_failed");
	return guestbookPageSchema.parse(await res.json()).items;
}

async function fetchGuestbookPage(offset: number): Promise<GuestbookPage> {
	const res = await fetch(`${ENDPOINT}?offset=${offset}&limit=${PAGE_SIZE}`);
	if (!res.ok) throw new Error("guestbook_load_failed");
	return guestbookPageSchema.parse(await res.json());
}

export async function postGuestbookComment(
	payload: GuestbookInput | GuestbookVerifiedInput,
): Promise<GuestbookComment> {
	const res = await fetch(ENDPOINT, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("guestbook_post_failed");
	const data = (await res.json()) as { item: unknown };
	return guestbookCommentSchema.parse(data.item);
}

export async function editGuestbookComment(
	id: number,
	payload: GuestbookEditInput | GuestbookVerifiedInput,
): Promise<GuestbookComment> {
	const res = await fetch(`${ENDPOINT}/${id}`, {
		method: "PATCH",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("guestbook_edit_failed");
	const data = (await res.json()) as { item: unknown };
	return guestbookCommentSchema.parse(data.item);
}

export async function deleteGuestbookComment(id: number): Promise<void> {
	const res = await fetch(`${ENDPOINT}/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("guestbook_delete_failed");
}

function selectComments(data: InfiniteData<GuestbookPage, number>): GuestbookComment[] {
	const seen = new Set<number>();
	const out: GuestbookComment[] = [];
	for (const page of data.pages) {
		for (const comment of page.items) {
			if (seen.has(comment.id)) continue;
			seen.add(comment.id);
			out.push(comment);
		}
	}
	return out;
}

export function guestbookFeedOptions() {
	return infiniteQueryOptions({
		queryKey: guestbookKeys.feed(),
		queryFn: ({ pageParam }) => fetchGuestbookPage(pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
		select: selectComments,
	});
}

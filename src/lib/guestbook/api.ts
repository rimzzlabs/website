import {
	GUESTBOOK_PAGE_SIZE,
	type GuestbookInput,
	guestbookPageSchema,
} from "@/lib/guestbook/schema";

export const GUESTBOOK_QUERY_KEY = ["guestbook"] as const;

export async function fetchGuestbookPage(cursor: number | null) {
	const params = new URLSearchParams({ limit: String(GUESTBOOK_PAGE_SIZE) });
	if (cursor !== null) params.set("cursor", String(cursor));

	const response = await fetch(`/api/guestbook?${params}`);
	if (!response.ok) throw new Error("Failed to load the guestbook.");
	return guestbookPageSchema.parse(await response.json());
}

export interface GuestbookSubmission extends GuestbookInput {
	token?: string;
}

export async function postGuestbookEntry(input: GuestbookSubmission) {
	const response = await fetch("/api/guestbook", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
	});
	if (!response.ok) throw new Error("Failed to save the entry.");
}

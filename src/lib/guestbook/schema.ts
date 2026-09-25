import { z } from "zod";

import type { Dictionary } from "@/i18n/en";

export const GUESTBOOK_LIMITS = { name: 100, site: 200, message: 500 } as const;
export const GUESTBOOK_PAGE_SIZE = 10;

export const AUTHOR_TYPES = ["anon", "github", "google"] as const;

export function normalizeSite(raw: string | null | undefined) {
	const site = raw?.trim();
	if (!site) return null;
	if (/^https?:\/\//i.test(site)) return site;
	return `https://${site}`;
}

function isWebsite(raw: string) {
	const site = normalizeSite(raw);
	if (!site) return true;
	if (!URL.canParse(site)) return false;
	const url = new URL(site);
	return url.hostname.includes(".");
}

export type GuestbookValidation = Dictionary["guestbook"]["validation"];

export function createGuestbookVerifiedSchema(messages: GuestbookValidation) {
	return z.object({
		site: z
			.string()
			.trim()
			.max(GUESTBOOK_LIMITS.site, messages.siteMax)
			.refine(isWebsite, messages.site)
			.optional(),
		message: z
			.string()
			.trim()
			.min(1, messages.message)
			.max(GUESTBOOK_LIMITS.message, messages.messageMax),
	});
}

export function createGuestbookAnonymousSchema(messages: GuestbookValidation) {
	return createGuestbookVerifiedSchema(messages).extend({
		name: z
			.string()
			.trim()
			.max(GUESTBOOK_LIMITS.name, messages.nameMax)
			.optional(),
		company: z.string().optional(),
	});
}

export type GuestbookInput = z.infer<
	ReturnType<typeof createGuestbookAnonymousSchema>
>;

export const guestbookEntrySchema = z.object({
	id: z.number(),
	name: z.string(),
	site: z.string().nullable(),
	message: z.string(),
	createdAt: z.number(),
	authorType: z.enum(AUTHOR_TYPES),
	avatar: z.string().nullable(),
});

export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;

export const guestbookPageSchema = z.object({
	items: z.array(guestbookEntrySchema),
	nextCursor: z.number().nullable(),
});

export type GuestbookPage = z.infer<typeof guestbookPageSchema>;

export const EMPTY_GUESTBOOK_PAGE: GuestbookPage = {
	items: [],
	nextCursor: null,
};

export const guestbookQuerySchema = z.object({
	cursor: z.coerce.number().int().positive().catch(Number.MAX_SAFE_INTEGER),
	limit: z.coerce.number().int().min(1).max(50).catch(GUESTBOOK_PAGE_SIZE),
});

export const GUESTBOOK_SELECT =
	"SELECT id, name, site, message, created_at AS createdAt, author_type AS authorType, avatar_url AS avatar FROM comments WHERE id < ? ORDER BY id DESC LIMIT ?";

export function toGuestbookPage(
	rows: ReadonlyArray<GuestbookEntry>,
	limit: number,
): GuestbookPage {
	const items = rows.slice(0, limit);
	if (rows.length <= limit) return { items, nextCursor: null };
	return { items, nextCursor: items.at(-1)?.id ?? null };
}

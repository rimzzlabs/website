import { z } from "zod";
import { interpolate } from "../i18n/utils";

export const GUESTBOOK_LIMITS = { name: 100, site: 200, message: 500 } as const;
export const AUTHOR_TYPES = ["anon", "github", "google"] as const;
export type AuthorType = (typeof AUTHOR_TYPES)[number];

/** Localized copy for every rule below — pass `dictionary.guestbook.validation`. */
export type GuestbookValidation = {
	name: string;
	nameMax: string;
	siteMax: string;
	message: string;
	messageMax: string;
	token: string;
};

/** The API only needs pass/fail; its messages never reach a reader, so they stay untranslated. */
export const API_VALIDATION: GuestbookValidation = {
	name: "invalid",
	nameMax: "invalid",
	siteMax: "invalid",
	message: "invalid",
	messageMax: "invalid",
	token: "invalid",
};

function tooLong(template: string, max: number) {
	return interpolate(template, { max });
}

function verifiedFields(t: GuestbookValidation) {
	return {
		site: z
			.string()
			.trim()
			.max(GUESTBOOK_LIMITS.site, tooLong(t.siteMax, GUESTBOOK_LIMITS.site))
			.optional(),
		message: z
			.string()
			.trim()
			.min(1, t.message)
			.max(GUESTBOOK_LIMITS.message, tooLong(t.messageMax, GUESTBOOK_LIMITS.message)),
	};
}

function contentFields(t: GuestbookValidation) {
	return {
		name: z
			.string()
			.trim()
			.min(1, t.name)
			.max(GUESTBOOK_LIMITS.name, tooLong(t.nameMax, GUESTBOOK_LIMITS.name)),
		...verifiedFields(t),
	};
}

export function guestbookInputSchema(t: GuestbookValidation) {
	return z.object({ ...contentFields(t), token: z.string().min(1, t.token) });
}

export function guestbookEditSchema(t: GuestbookValidation) {
	return z.object(contentFields(t));
}

export function guestbookVerifiedSchema(t: GuestbookValidation) {
	return z.object(verifiedFields(t));
}

export type GuestbookInput = z.infer<ReturnType<typeof guestbookInputSchema>>;
export type GuestbookEditInput = z.infer<ReturnType<typeof guestbookEditSchema>>;
export type GuestbookVerifiedInput = z.infer<ReturnType<typeof guestbookVerifiedSchema>>;

export const guestbookCommentSchema = z.object({
	id: z.number(),
	name: z.string(),
	site: z.string().nullable(),
	message: z.string(),
	createdAt: z.number(),
	updatedAt: z.number().nullable(),
	authorType: z.enum(AUTHOR_TYPES),
	avatar: z.string().nullable(),
	isOwn: z.boolean(),
});

export type GuestbookComment = z.infer<typeof guestbookCommentSchema>;

export const guestbookPageSchema = z.object({
	items: z.array(guestbookCommentSchema),
	nextOffset: z.number().nullable(),
});

export type GuestbookPage = z.infer<typeof guestbookPageSchema>;

export const guestbookQuerySchema = z.object({
	offset: z.coerce.number().int().min(0).catch(0),
	limit: z.coerce.number().int().min(1).max(50).catch(10),
});

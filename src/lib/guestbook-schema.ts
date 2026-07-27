import { z } from "zod";

export const GUESTBOOK_LIMITS = { name: 100, site: 200, message: 500 } as const;

export type GuestbookContentMessages = { name: string; message: string };
export type GuestbookMessages = GuestbookContentMessages & { token: string };

function contentFields(messages: GuestbookContentMessages) {
	return {
		name: z.string().trim().min(1, messages.name).max(GUESTBOOK_LIMITS.name),
		site: z.string().trim().max(GUESTBOOK_LIMITS.site).optional(),
		message: z.string().trim().min(1, messages.message).max(GUESTBOOK_LIMITS.message),
	};
}

export function guestbookInputSchema(messages: GuestbookMessages) {
	return z.object({ ...contentFields(messages), token: z.string().min(1, messages.token) });
}

export function guestbookEditSchema(messages: GuestbookContentMessages) {
	return z.object(contentFields(messages));
}

export type GuestbookInput = z.infer<ReturnType<typeof guestbookInputSchema>>;
export type GuestbookEditInput = z.infer<ReturnType<typeof guestbookEditSchema>>;

export const guestbookCommentSchema = z.object({
	id: z.number(),
	name: z.string(),
	site: z.string().nullable(),
	message: z.string(),
	createdAt: z.number(),
	updatedAt: z.number().nullable(),
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

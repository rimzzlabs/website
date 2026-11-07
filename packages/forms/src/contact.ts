import { LOCALES } from "@rimzzlabs/i18n/config";
import type { Dictionary } from "@rimzzlabs/i18n/en";
import { z } from "zod";

export type ContactValidation = Dictionary["contact"]["validation"];

export function createContactSchema(messages: ContactValidation) {
	return z.object({
		name: z.string().trim().min(1, messages.name).max(100, messages.nameMax),
		email: z.email(messages.email).max(254),
		message: z
			.string()
			.trim()
			.min(10, messages.messageMin)
			.max(2000, messages.messageMax),
		company: z.string().optional(),
		locale: z.enum(LOCALES).optional(),
	});
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>;

import { z } from "zod";

import type { Dictionary } from "@/i18n/en";

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
	});
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>;

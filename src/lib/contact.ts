import { z } from "zod";

export const contactSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Please tell me your name.")
		.max(100, "Please keep your name under 100 characters."),
	email: z.email("Please enter a valid email address.").max(254),
	message: z
		.string()
		.trim()
		.min(10, "Please write at least 10 characters.")
		.max(2000, "Please keep your message under 2,000 characters."),
	company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

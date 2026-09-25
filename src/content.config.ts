import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const noteSchema = z.object({
	title: z.string(),
	description: z.string(),
	keywords: z.array(z.string()),
	publishedAt: z
		.string()
		.regex(/^\d{2}\/\d{2}\/\d{4}$/, "Use MM/DD/YYYY, for example 09/25/2026."),
	status: z.enum(["published", "draft"]),
	featured: z.boolean(),
	author: reference("authors"),
});

const notes = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
	schema: noteSchema,
});

const legal = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updatedAt: z
			.string()
			.regex(
				/^\d{2}\/\d{2}\/\d{4}$/,
				"Use MM/DD/YYYY, for example 09/25/2026.",
			),
	}),
});

export const collections = { notes, legal };

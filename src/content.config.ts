import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const noteSchema = z.object({
	title: z.string(),
	description: z.string(),
	keywords: z.array(z.string()),
	publishedAt: z.string(),
	status: z.enum(["published", "draft"]),
	featured: z.boolean(),
	author: reference("authors"),
});

const authorsSchema = z.object({
	fullName: z.string(),
	username: z.string(),
	url: z.string(),
});

const notes = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
	schema: noteSchema,
});

const authors = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
	schema: authorsSchema,
});

export const collections = { notes, authors };

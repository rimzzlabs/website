import { glob } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

let noteSchema = z.object({
	title: z.string(),
	description: z.string(),
	keywords: z.array(z.string()),
	publishedAt: z.string(),
	status: z.enum(['published', 'draft']),
	featured: z.boolean(),
	author: reference('authors'),
})

let authorsSchema = z.object({
	fullName: z.string(),
	username: z.string(),
	url: z.string(),
})

let notes = defineCollection({
	schema: noteSchema,
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
})

let authors = defineCollection({
	schema: authorsSchema,
	loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
})

export type TNoteSchema = z.infer<typeof noteSchema>
export let collections = {
	notes,
	authors,
}

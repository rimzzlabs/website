import { defineCollection, reference, z } from "astro:content";

let noteSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  publishedAt: z.string(),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
  author: reference("authors"),
});

let authorsSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  url: z.string(),
});

let notesSchema = defineCollection({
  type: "content",
  schema: noteSchema,
});

let authorsCollection = defineCollection({
  type: "data",
  schema: authorsSchema,
});

export type TNoteSchema = z.infer<typeof noteSchema>;
export let collections = {
  notes: notesSchema,
  authors: authorsCollection,
};

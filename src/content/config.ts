import { defineCollection, reference, z } from "astro:content";

let blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  publishedAt: z.string(),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
  author: reference("authors"),
  relatedPosts: z.array(reference("blog")).optional(),
});

let authorsSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  url: z.string(),
});

let blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});

let authorsCollection = defineCollection({
  type: "data",
  schema: authorsSchema,
});

export type TBlogSchema = z.infer<typeof blogSchema>;
export let collections = {
  blog: blogCollection,
  authors: authorsCollection,
};

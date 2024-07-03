import { z } from "astro/zod";

export let ReactionResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    slug: z.string(),
    reactions: z.array(z.object({ reaction: z.string(), count: z.number() })),
  }),
});

export let sendReactionSchema = z.object({
  slug: z.string({ message: "Slug is required" }),
  reaction: z.enum(["like", "love", "eyes", "star_struck", "rocket"]),
});

export type TSendReactionSchema = z.infer<typeof sendReactionSchema>;
export type TReactionResponseSchema = z.infer<typeof ReactionResponseSchema>;

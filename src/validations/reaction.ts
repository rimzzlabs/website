import { z } from "astro/zod";

export let ReactionResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.object({
    slug: z.string(),
    reactions: z.array(z.object({ reaction: z.string(), count: z.number() })),
  }),
});

export type TReactionResponseSchema = z.infer<typeof ReactionResponseSchema>;

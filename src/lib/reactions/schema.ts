import { z } from "zod";

// Note slugs are lowercase words joined by hyphens, like the MDX file names.
export const noteSlugSchema = z
	.string()
	.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
	.max(120);

export const reactionStateSchema = z.object({
	count: z.number().int().nonnegative(),
	reacted: z.boolean(),
});

export type ReactionState = z.infer<typeof reactionStateSchema>;

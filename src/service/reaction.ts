import type { TSendReactionSchema } from "@/validations/reaction";
import { db } from "db";
import { reaction } from "db/schema";
import { count, eq } from "drizzle-orm";

export async function selectReaction(slug: string) {
  return await db
    .select({ count: count(), reaction: reaction.reaction })
    .from(reaction)
    .where(eq(reaction.slug, slug))
    .groupBy(reaction.reaction);
}
export type TSelectReaction = Awaited<ReturnType<typeof selectReaction>>;

export async function insertReaction(payload: TSendReactionSchema) {
  let res = await db
    .insert(reaction)
    .values(payload)
    .returning({ id: reaction.id });

  return res[0].id;
}

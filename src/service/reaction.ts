import type { TSendReactionSchema } from "@/validations/reaction";
import { db } from "db";
import { reactionTable } from "db/schema";
import { count, eq } from "drizzle-orm";

export async function selectReaction(slug: string) {
  return await db
    .select({ count: count(), reaction: reactionTable.reaction })
    .from(reactionTable)
    .where(eq(reactionTable.slug, slug))
    .groupBy(reactionTable.reaction);
}
export type TSelectReaction = Awaited<ReturnType<typeof selectReaction>>;

export async function insertReaction(payload: TSendReactionSchema) {
  let res = await db
    .insert(reactionTable)
    .values(payload)
    .returning({ id: reactionTable.id });

  return res[0].id;
}

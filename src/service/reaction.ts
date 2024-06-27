import { db } from "db";
import { reactionTable, type TReactionTableInsert } from "db/schema";
import { count, eq } from "drizzle-orm";

export async function selectReaction(slug: string) {
  return await db
    .select({ count: count(), reaction: reactionTable.reaction })
    .from(reactionTable)
    .where(eq(reactionTable.slug, slug))
    .groupBy(reactionTable.reaction);
}

export async function insertReaction(
  slug: string,
  reaction: TReactionTableInsert["reaction"],
) {
  let res = await db
    .insert(reactionTable)
    .values({ reaction, slug })
    .returning({ id: reactionTable.id });

  return res[0].id;
}

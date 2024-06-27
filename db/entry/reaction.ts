import { db } from "db";
import { reactionTable } from "db/schema/reaction";
import { count, eq } from "drizzle-orm";

export async function getReactionBySlug(slug: string) {
  return await db
    .select({
      type: reactionTable.reactionType,
      count: count(),
    })
    .from(reactionTable)
    .where(eq(reactionTable.slug, slug))
    .groupBy(reactionTable.reactionType);
}

export async function postReactionBySlug(
  slug: string,
  reactionType: (typeof reactionTable.$inferInsert)["reactionType"],
) {
  return await db.insert(reactionTable).values({ reactionType, slug });
}

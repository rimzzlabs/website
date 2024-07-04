import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export let reaction = sqliteTable("reaction", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  reaction: text("reaction_type", {
    enum: ["like", "love", "eyes", "star_struck", "rocket"],
  }).notNull(),
});

export let reactionTableInsert = reaction.$inferInsert;
export let reactionTableSelect = reaction.$inferSelect;

export type TReactionTableInsert = typeof reactionTableInsert;
export type TReactionTableSelect = typeof reactionTableSelect;

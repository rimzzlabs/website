import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export let reactionTable = sqliteTable("reaction", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  reaction: text("reaction_type", {
    enum: ["like", "love", "eyes", "star_struck", "rocket"],
  }).notNull(),
});

export let reactionTableInsert = reactionTable.$inferInsert;
export let reactionTableSelect = reactionTable.$inferSelect;

export type TReactionTableInsert = typeof reactionTableInsert;
export type TReactionTableSelect = typeof reactionTableSelect;

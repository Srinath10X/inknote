import { json, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  content: json("content").notNull(),
});

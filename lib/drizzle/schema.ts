import { pgTable, uuid, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  noteCtx: jsonb("note_ctx").default({
    note_title: "Untitled",
    note_emoji: "",
    note_content: [],
  }),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type NoteCtx = {
  note_title: string;
  note_emoji: string;
  note_content: any[];
};

export type Note = typeof notes.$inferSelect & {
  noteCtx: NoteCtx;
};

export type NewNote = typeof notes.$inferInsert & {
  noteCtx?: Partial<NoteCtx>;
};

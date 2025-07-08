import { db } from "@/lib/drizzle/client";
import { notes } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  context: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await context.params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const [note] = await db.select().from(notes).where(eq(notes.id, noteId));

  if (!note || note.userId !== user.id) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.json({ content: note.noteCtx?.note_content ?? [] });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ noteId: string }> },
) {
  const { noteId } = await context.params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response("Unauthorized", { status: 401 });

  const { content } = await req.json();

  await db
    .update(notes)
    .set({
      noteCtx: {
        note_content: content,
      },
    })
    .where(eq(notes.id, noteId));

  return Response.json({ success: true });
}

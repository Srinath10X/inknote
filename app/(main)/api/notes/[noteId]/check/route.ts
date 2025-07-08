import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/client";
import { notes } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
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

  return Response.json({ exists: true });
}

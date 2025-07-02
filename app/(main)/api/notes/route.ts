import { eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/client";
import { notes } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * TODO: Refactor the supabase logic and implement the other api endpoints
 */

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = user?.id;
  const userNotes = await db.select().from(notes).where(eq(notes.userId, userId)).execute();

  return NextResponse.json(userNotes);
}

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = user?.id;

  await db.insert(notes).values({ userId });
  return NextResponse.json({ message: "Note created successfully" }, { status: 201 });
}

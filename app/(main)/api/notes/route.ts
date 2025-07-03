import { and, eq } from "drizzle-orm";
import { db } from "@/lib/drizzle/client";
import { notes } from "@/lib/drizzle/schema";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user?.id;
  const userNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .execute();

  return NextResponse.json(userNotes);
}

export async function POST() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user?.id;

  await db.insert(notes).values({ userId });
  return NextResponse.json(
    { message: "Note created successfully" },
    { status: 201 },
  );
}

export async function DELETE(request: NextRequest) {
  const { noteId } = await request.json();
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = user?.id;

  await db
    .delete(notes)
    .where(and(eq(notes.id, noteId), eq(notes.userId, userId)));

  return NextResponse.json(
    { message: "Note deleted successfully" },
    { status: 200 },
  );
}

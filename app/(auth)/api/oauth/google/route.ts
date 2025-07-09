import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const baseSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseSiteUrl}/api/auth/callback`,
    },
  });

  if (data?.url === null || error) {
    return NextResponse.redirect("http://localhost:3000/auth/auth-code-error");
  }

  return NextResponse.redirect(data!.url);
}

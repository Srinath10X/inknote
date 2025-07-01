import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function createClient(
  request?: NextRequest,
  response?: NextResponse,
) {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => (request ? request.cookies.getAll() : cookieStore.getAll()),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          if (response) {
            response.cookies.set(name, value, options);
          } else {
            cookieStore.set(name, value, options);
          }
        });
      },
    },
  });
}

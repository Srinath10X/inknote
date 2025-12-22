import { updateSession } from "@/utils/supabase/proxy";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/auth/"))
		return NextResponse.next();

	return await updateSession(request);
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};

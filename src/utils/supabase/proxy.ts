import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
	let response = NextResponse.next({ request });
	const supabase = await createClient(request, response);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathName = request.nextUrl.pathname;
	const publicPaths = ["/", "/signin", "/signup"];
	const isPublicPath = publicPaths.includes(pathName);

	if (!user && !isPublicPath) {
		response = NextResponse.redirect(new URL("/signin", request.url));
	}

	if (user && isPublicPath) {
		response = NextResponse.redirect(new URL("/editor", request.url));
	}

	return response;
}

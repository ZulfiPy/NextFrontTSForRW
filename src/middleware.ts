import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value;

    if (!sessionToken) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

export const config = {
    matcher: ['/components/:path*', '/training/:path*']
}
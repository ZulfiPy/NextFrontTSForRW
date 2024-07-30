import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const authSession = cookieStore.get('auth_session')?.value;

    if (!authSession) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
}

export const config = {
    matcher: ['/components/:path*', '/training/:path*']
}
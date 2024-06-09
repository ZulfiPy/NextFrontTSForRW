var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export function middleware(request) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const cookieStore = cookies();
        const sessionToken = (_a = cookieStore.get('next-auth.session-token')) === null || _a === void 0 ? void 0 : _a.value;
        if (!sessionToken) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    });
}
export const config = {
    matcher: ['/components/:path*', '/training/:path*']
};

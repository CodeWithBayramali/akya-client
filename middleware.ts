import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export default async function middleware(req) {
    const token =
        req.cookies.get("next-auth.session-token")?.value ||
        req.cookies.get("__Secure-next-auth.session-token");

    if (token) {
        req.cookies.set("Authorization", `Bearer ${token}`);
    }

    const decodedToken = token ? jwtDecode(token) : undefined;

    // Admin ve Profile route koruma
    const pathname = req.nextUrl.pathname;

    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute && (!token || decodedToken.role[0] !== "ADMIN")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/profile/:path*"],
};

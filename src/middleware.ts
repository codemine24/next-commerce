import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value || "";

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isAccountRoute = request.nextUrl.pathname.startsWith("/account");

    if ((isAccountRoute || isAdminRoute) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = jwtDecode(token, { header: true }) as { role: string };

    if (isAdminRoute && decodedToken.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    if (isAccountRoute && decodedToken.role !== "USER") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/account",
        "/account/:path*",
        "/admin",
        "/admin/:path*",
    ],
};
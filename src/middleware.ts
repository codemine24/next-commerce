import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value || "";

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isUserRoute = request.nextUrl.pathname.startsWith("/account");

    if ((isUserRoute || isAdminRoute) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = jwtDecode(token) as { role: string };

    if (isAdminRoute && decodedToken.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/not-found", request.url));
    }

    if (isUserRoute && decodedToken.role !== "USER") {
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
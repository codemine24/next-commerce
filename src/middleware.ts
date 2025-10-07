import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value || "";

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
    const isUserRoute = request.nextUrl.pathname.startsWith("/user");

    if ((isUserRoute || isAdminRoute) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const decodedToken = jwtDecode(token) as { role: string };

    const adminOrSuperAdmin = decodedToken.role === "ADMIN" || decodedToken.role === "SUPER_ADMIN";

    if (isAdminRoute && !adminOrSuperAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (isUserRoute && decodedToken.role !== "CUSTOMER") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user",
        "/user/:path*",
        "/admin",
        "/admin/:path*",
    ],
};
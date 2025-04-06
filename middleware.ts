import type {NextRequest} from "next/server"
import {NextResponse} from "next/server"

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("auth-token")?.value
    const {pathname} = request.nextUrl

    // Check if the path is an admin route
    const isAdminRoute = pathname.startsWith("/admin")

    // If it's an admin route and there's no auth token, redirect to login
    if (isAdminRoute && !authToken) {
        const url = new URL("/login", request.url)
        url.searchParams.set("redirect", pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Only run middleware on admin routes
export const config = {
    matcher: ["/admin/:path*"],
}


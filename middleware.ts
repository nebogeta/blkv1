
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname // relative path

    // Manage route protection
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/login')

    const sensitiveRoutes = ['/dashboard', '/expense', '/update', '/group']

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }

        return null
    }

    if (
        !isAuth &&
        sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/expense/:path*', '/api/group/:path*', '/expense/:path*', '/update/:path*', '/group/:path*'],
}

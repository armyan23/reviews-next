import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token');

    if (token && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return Response.redirect(new URL('/dashboard', request.url))
    }else if (!token && !request.nextUrl.pathname.startsWith('/auth')) {
        return Response.redirect(new URL('/auth/login', request.url))
    }else {
        NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*', '/'],
};

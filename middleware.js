import { NextResponse } from 'next/server';

export function middleware(req) {
  // Get token from cookies (server-side)
  const token = req.cookies.get('token');

  // If no token and the path isn't /login, redirect to /login
  if (!token && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page
  }

  // Continue to the next middleware or request handler
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/story/:path*'], // Apply middleware to these routes
};

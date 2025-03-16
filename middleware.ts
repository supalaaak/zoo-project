import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes that require authentication
  const protectedRoutes = ['/widgets', '/zoo-quest-adventure'];
  
  // Define auth routes (login, signup)
  const authRoutes = ['/auth/login', '/auth/signup'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname === route
  );

  // Check for the session cookie instead of Next Auth token
  const sessionCookie = request.cookies.get('session')?.value;

  // If it's a protected route and there's no session, redirect to login
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If it's an auth route and the user is already logged in, redirect to dashboard
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/widgets', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

// Configure which paths middleware will run on
export const config = {
  matcher: [
    // Apply to all routes except static files, api routes, and _next
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
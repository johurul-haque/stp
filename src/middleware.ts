import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('access_token');
  const path = request.nextUrl.pathname;

  const authRoutes = ['/login', '/register'];

  if (!cookie && !authRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!cookie) return;

  const url = `${process.env.BASE_API_URL}/users/profile`;
  const res = await fetch(url, {
    headers: {
      Authorization: cookie.value,
    },
  });

  if (res.status === 401 && !authRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('access_token');
  const path = request.nextUrl.pathname;

  const authRoutes = ['/login', '/register'];

  if (!cookie && !authRoutes.includes(path)) {
    return redirectToLogin(path, request.url);
  }

  if (!cookie) return;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile`;
    const res = await fetch(url, {
      headers: {
        Authorization: cookie.value,
      },
    });

    if ([401, 404].includes(res.status) && !authRoutes.includes(path)) {
      return redirectToLogin(path, request.url);
    }

    if (!path.startsWith('/dashboard') && res.status === 200) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  } catch (error) {
    // If server crashes the dashboard page will show the error fallback page
    if (!authRoutes.includes(path)) {
      return redirectToLogin(path, request.url);
    }
  }
}

function redirectToLogin(redirectFrom: string, url: string) {
  return NextResponse.redirect(
    new URL(`/login?redirect_from=${redirectFrom}`, url)
  );
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};

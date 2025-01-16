import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const manager = cookieStore.get('manager')?.value;

  if (request.nextUrl.pathname === '/manager') {
    if (!manager) {
      return NextResponse.redirect(new URL('/manager/auth', request.url));
    }
  }

  if (request.nextUrl.pathname === '/manager/auth') {
    if (manager) {
      return NextResponse.redirect(new URL('/manager', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

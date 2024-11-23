import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.hostname = 'app.runvectorial.com';
  url.port = '443';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/:path*',
};
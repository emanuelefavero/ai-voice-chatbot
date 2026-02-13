import { isDev } from '@/config/env/public'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect to 404 if trying to access dev routes in production
  if (pathname.startsWith('/dev') && !isDev) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }

  return NextResponse.next()
}

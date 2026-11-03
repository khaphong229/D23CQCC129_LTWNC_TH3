import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || 'ptit_deadline_hub_secret_key_123456',
    })

    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }

    if (path.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/403', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}

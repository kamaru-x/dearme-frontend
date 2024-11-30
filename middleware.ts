import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isTokenExpired, refreshAccessToken } from './app/utils/auth'

export async function middleware(request: NextRequest) {
  const isPublicPath = ['/login'].includes(request.nextUrl.pathname)
  const isRootPath = request.nextUrl.pathname === '/'
  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // Redirect root to dashboard if authenticated
  if (isRootPath && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If on public path and has valid token, redirect to dashboard
  if (isPublicPath && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If on private path
  if (!isPublicPath) {
    // If no token or refresh token, redirect to login
    if (!token || !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // If token is expired, try to refresh
    if (isTokenExpired(token)) {
      const newToken = await refreshAccessToken(refreshToken)
      
      // If refresh failed, redirect to login
      if (!newToken) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('token')
        response.cookies.delete('refresh_token')
        return response
      }

      // Continue with new token
      const response = NextResponse.next()
      response.cookies.set('token', newToken, { 
        path: '/',
        maxAge: 24 * 60 * 60 // 1 day
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported languages
const locales = ['en', 'tr', 'ru']
const defaultLocale = 'tr'

// Get the preferred locale from cookie, header, or default to 'tr'
function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => locales.includes(lang))
    
    if (preferredLocale) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // If it's the root path, redirect to the preferred language
  if (pathname === '/') {
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}`
    const response = NextResponse.redirect(request.nextUrl)
    response.cookies.set('NEXT_LOCALE', locale)
    return response
  }

  // Skip if the request is for an asset, API route, or already has a locale
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    locales.some(locale => pathname.startsWith(`/${locale}`))
  ) {
    return
  }

  // Redirect to the same URL but with locale prefix
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  
  // Also update the locale cookie
  const response = NextResponse.redirect(request.nextUrl)
  response.cookies.set('NEXT_LOCALE', locale)
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 
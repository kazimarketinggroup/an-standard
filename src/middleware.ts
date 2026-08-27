import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL, isSupabaseConfigured } from '@/lib/supabase/env'

/**
 * Guards /admin/* and keeps the Supabase session cookie fresh.
 *
 * Server Components cannot write cookies, so refreshed tokens have to be set
 * here on the response — without this, an admin gets logged out as soon as the
 * access token expires.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const { pathname: requestedPath } = request.nextUrl

  /*
   * Without configuration nobody can sign in, so nobody may pass. Letting the
   * request through here would open the whole dashboard to anyone the moment
   * the environment variables were missing — which is exactly what happened on
   * the first deploy. Only the login page renders, to explain the problem.
   */
  if (!isSupabaseConfigured) {
    if (requestedPath === '/admin/login') return response

    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.search = ''
    return NextResponse.redirect(url)
  }

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_PUBLIC_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isLoginPage = pathname === '/admin/login'

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    // Remember where they were headed so login can send them back.
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}

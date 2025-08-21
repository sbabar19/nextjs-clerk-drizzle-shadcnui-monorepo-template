import { Locale } from "@/types/locale"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { NextRequest, NextResponse } from "next/server"

const locales: Locale[] = ["en", "zh_CN", "zh_TW", "ur"]

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const headers = request.headers
  //@ts-expect-error headers is not typed
  const languages = new Negotiator({ headers })
    .languages()
    .filter((lang: string) => locales.includes(lang as Locale))
  const defaultLocale = "en"

  return match(languages, locales, defaultLocale) // -> 'en-US'
}

const isProtectedRoute = createRouteMatcher(["/(.*)"])

const UNPROTECTED_ROUTES = [
  ...locales.reduce((acc, locale) => {
    acc.push(`/${locale}/sign-up(.*)`)
    acc.push(`/${locale}/sign-in(.*)`)
    acc.push(`/${locale}/forgot-password(.*)`)
    return acc
  }, [] as string[]),
  "/sign-up(.*)",
  "/sign-in(.*)",
  "/forgot-password(.*)",
]

const isUnprotectedRoute = createRouteMatcher(UNPROTECTED_ROUTES)

export default clerkMiddleware(async (auth, req) => {
  if (!isUnprotectedRoute(req)) {
    if (isProtectedRoute(req)) await auth.protect()
  }

  return middleware(req)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}

function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  console.log("pathname", pathname)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )
  console.log("pathnameHasLocale", pathnameHasLocale)
  if (pathnameHasLocale) return
  // We don't need to handle locale for api routes
  if (pathname.startsWith("/api")) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { edgeRateLimit } from "./lib/edge-rate-limit"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/:shortCode",
  "/api/shorten",
    "/auth/callback",

])

export default clerkMiddleware(async (auth, req) => {
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for") ||
    "unknown"

  const pathname = req.nextUrl.pathname
  if (!pathname.startsWith("/api") && pathname.length <= 8) {
    const allowed = await edgeRateLimit(
      `redirect:${ip}`,
      100,
      60
    )

    if (!allowed) {
      return new NextResponse("Too many requests", { status: 429 })
    }
  }
  if (pathname === "/api/shorten") {
    const allowed = await edgeRateLimit(
      `shorten:${ip}`,
      5,
      60
    )

    if (!allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      )
    }
  }
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)",
    "/(api|trpc)(.*)",
  ],
}

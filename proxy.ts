import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: replaces middleware.ts, runs on the Node.js runtime.
// SECURITY: since CVE-2025-29927, proxy interception must NOT be the only auth gate.
// Real role/session checks live in the (admin)/(account) layouts via protectRoute().
// This file only handles lightweight routing.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/checkout")) {
    if (!req.cookies.get("ts_cart")?.value) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/checkout/:path*"] };